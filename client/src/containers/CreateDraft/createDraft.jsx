import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import Form from '../../components/Form/form.jsx';
import { createDraft } from '../../actions';
import { draft as draftForm } from '../../../formConstants.json';

const scheduledTime = draftForm.inputs.find(input => input.name === 'scheduledTime');

const timeFormat = 'hh:mm a';

const INITIAL_TIME_CHARS = ['-', '-', ':', '-', '-'];
const MAX_HOURS_COLUMN_VALUE = 23;
const DELETE_KEY_CODE = 8;

const VALID_TIME_INPUT = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const mapDispatchToProps = dispatch => ({
  createDraft: body => dispatch(createDraft(body)),
});

const get24HourTime = (timeString) => {
  if (timeString[timeString.length - 2] === 'a') {
    return timeString.substring(0, 5);
  } else {
    const modifiedHour = Number(timeString.substring(0, 2)) + 12;
    return `${modifiedHour}${timeString.substring(2, 5)}`;
  }
}

const createFinalTimestamp = (date, time) => date.replace('12:00:00', `${time}:00`);


const areFirstTwoCharsInvalid = (timeChars, inputChar) => (
  Number(`${timeChars[4]}${inputChar}`) > MAX_HOURS_COLUMN_VALUE && inputChar > 5
);

const isFourthCharNotPermitted = timeChars => (
  Number(`${timeChars[1]}${timeChars[3]}`) > MAX_HOURS_COLUMN_VALUE
  || (timeChars[1] !== '-' && timeChars[4] !== '-' && timeChars[4] > 5)
);

const addTimeChar = (timeChars, inputChar) => {
  timeChars.push(inputChar);
  if (timeChars[3] !== '-') {
    if (timeChars[1] !== '-') {
      const tensDigit = timeChars[1];
      timeChars[0] = tensDigit;
    }
    const onesDigit = timeChars[3];
    timeChars[1] = onesDigit;
  }
  timeChars.splice(timeChars.indexOf(':'), 1);
  timeChars[2] = ':';
  return timeChars;
};

const deleteTimeChar = (timeChars) => {
  timeChars.pop();
  timeChars.unshift('-');
  timeChars.splice(timeChars.indexOf(':'), 1);
  timeChars.splice(2, 0, ':');
  return timeChars;
}

const formatTimeChars = (timeChars) => (
  timeChars[0] === '-' || timeChars[0] === '0'
  ? timeChars.slice(1).join('')
  : timeChars.join('')
);

const convertTo12HourFormat = timeString => {
  const hourColumn = Number(timeString.split(':')[0]);
  if (hourColumn === 0) {
    return timeString.replace(hourColumn, 12);
  }
  if (hourColumn > 12) {
    return timeString.replace(hourColumn, hourColumn - 12);
  }
  return timeString;
}


class CreateDraft extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      shouldScheduleTime: null,
      calendarDate: null,
      timeChars: null,
      timeCharsAsString: null,
      isCalendarFocused: false,
      isSubmitComplete: false,
      errorMessage: null,
      hasTimeInputError: false,
      isTimePickerEnabled: false,
      isPmSelected: false,
    };
  }

  componentDidMount() {
    this.setState({
      calendarDate: moment(),
      timeChars: INITIAL_TIME_CHARS,
    });
  }

  handleTimePickerKeyUp = (ev) => {
    const { timeChars } = this.state;
    if (ev.keyCode === DELETE_KEY_CODE && this.state.timeChars[4] !== '-') {
      this.setState({ timeChars: deleteTimeChar([...this.state.timeChars]) });
      return;
    }
    if (
      isNaN(Number(ev.key))
      || timeChars[0] !== '-'
      || (timeChars[3] === '-' && areFirstTwoCharsInvalid(timeChars, ev.key))
      || isFourthCharNotPermitted(timeChars)
    ) {
      return;
    }
    this.setState({ timeChars: addTimeChar([...this.state.timeChars], ev.key) });
  }

  enableTimePicker = () => {
    const { timeChars, timeCharsAsString } = this.state;
    let updatedTimeChars;
    if (timeCharsAsString) {
      const hourColumn = timeCharsAsString.split(':')[0];
      const hourArray = hourColumn.length > 1 ? hourColumn.split('') : ['-', hourColumn];
      updatedTimeChars = hourArray.concat(timeChars.slice(2))
    }
    this.setState({
      isTimePickerEnabled: true,
      timeChars: updatedTimeChars || timeChars,
    });
  }

  handleBlur = () => {
    const timeCharsAsString = formatTimeChars(this.state.timeChars);
    if (!VALID_TIME_INPUT.test(timeCharsAsString)) {
      this.setState({
        hasTimeInputError: true,
        isTimePickerEnabled: false,
        timeChars: INITIAL_TIME_CHARS,
        timeCharsAsString: null,
      });
      return;
    }
    this.setState({
      hasTimeInputError: false,
      isTimePickerEnabled: false,
      timeCharsAsString: convertTo12HourFormat(timeCharsAsString),
    });
  }


  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  changeDate = (calendarDate) => {
    this.setState({ calendarDate })
  }

  toggleAmPm = (isPmSelected) => {
    this.setState({ isPmSelected })
  }

  toggleCalendarFocus = (isCalendarFocused) => {
    this.setState({ isCalendarFocused })
  }

  updateScheduleTimeField() {
    const shouldScheduleTime = this.state.shouldScheduleTime === 'Yes';
    if (shouldScheduleTime) {
      scheduledTime.enabled = true;
    } else {
      scheduledTime.enabled = false;
      this.setState({ calendarDate: null, time: null });
    }
    this.forceUpdate();
  }

  updateFieldValue = (name, value) => {
    this.setState({
      [name]: value
    }, () => {
      if (name === 'shouldScheduleTime') {
        this.updateScheduleTimeField();
      }
    });
  }


  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, calendarDate, time } = this.state;
    let finalTimeStamp;
    if (calendarDate) {
      const formattedDate = calendarDate.format();
      const modifiedTime = get24HourTime(time.format(timeFormat));
      finalTimeStamp = createFinalTimestamp(formattedDate, modifiedTime);
    }
    const body = {
      name,
      timeScheduled: finalTimeStamp,
      ownerUserId: this.props.currentUser.id,
    };
    this.props.createDraft(body).then(() => this.setState({ isSubmitComplete: true }));
  }


  render() {
    const {
      errorMessage,
      calendarDate,
      isCalendarFocused,
      isSubmitComplete,
      timeChars,
      timeCharsAsString,
      isTimePickerEnabled,
      isPmSelected,
    } = this.state;
    return (
      <div>
        {!isSubmitComplete &&
          <Form
            updateFieldValue={this.updateFieldValue}
            handleSubmit={this.handleSubmit}
            title={draftForm.title}
            formInputs={draftForm.inputs}
            errorMessage={errorMessage}
            calendarDate={calendarDate}
            changeDate={this.changeDate}
            timeFormat={timeFormat}
            isCalendarFocused={isCalendarFocused}
            toggleCalendarFocus={this.toggleCalendarFocus}
            timeChars={timeChars}
            timeCharsAsString={timeCharsAsString}
            handleTimePickerKeyUp={this.handleTimePickerKeyUp}
            isTimePickerEnabled={isTimePickerEnabled}
            enableTimePicker={this.enableTimePicker}
            isPmSelected={isPmSelected}
            toggleAmPm={this.toggleAmPm}
            handleBlur={this.handleBlur}
          />
        }
        {isSubmitComplete &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

CreateDraft.propTypes = {
  createDraft: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDraft);
