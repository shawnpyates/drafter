import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Form from '../../components/Form/form';
import { createDraft } from '../../actions';

import { draft as draftForm } from '../../../formConstants.json';

import {
  addTimeChar,
  createFinalTimestamp,
  deleteTimeChar,
  formatTimeChars,
  get24HourTime,
  initializeDateAndTime,
  isInvalidTimeInput,
  resetTimeValues,
} from './timeInputHandlers';

const INITIAL_TIME_CHARS = ['-', '-', ':', '-', '-'];
const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD[T12:00:00]ZZ';
const DELETE_KEY_CODE = 8;
const ERROR_MESSAGE_DURATION = 2000;
const VALID_TIME_INPUT = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const mapDispatchToProps = dispatch => ({
  createDraft: body => dispatch(createDraft(body)),
});

const validateForm = (state) => {
  const {
    name,
    calendarDate,
    timeCharsAsString,
    isPmSelected,
    buttonsToHighlight,
  } = state;
  const { missingField, mustBeFutureTime } = draftForm.errorMessages;
  const { shouldScheduleTime } = buttonsToHighlight;
  if (!name || (shouldScheduleTime && !timeCharsAsString)) {
    return { errorMessage: missingField };
  }
  let finalTimeStamp;
  if (calendarDate) {
    const formattedDate = calendarDate.format(CALENDAR_DATE_FORMAT);
    const modifiedTime = get24HourTime(timeCharsAsString, isPmSelected);
    finalTimeStamp = createFinalTimestamp(formattedDate, modifiedTime);
  }
  if (new Date() > new Date(finalTimeStamp)) {
    return { errorMessage: mustBeFutureTime };
  }
  return { finalTimeStamp, name };
};

class CreateDraft extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      calendarDate: null,
      timeChars: null,
      timeCharsAsString: null,
      isCalendarFocused: false,
      isSubmitComplete: false,
      errorMessage: null,
      isTimePickerEnabled: false,
      isPmSelected: false,
      buttonsToHighlight: {
        shouldScheduleTime: false,
      },
    };
  }

  componentDidMount() {
    this.initializeDateAndTime();
  }

  componentDidUpdate() {
    if (this.state.errorMessage) {
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, ERROR_MESSAGE_DURATION);
    }
  }

  initializeDateAndTime = () => {
    this.setState(initializeDateAndTime());
  }

  handleTimePickerKeyUp = (ev) => {
    const { timeChars } = this.state;
    if (ev.keyCode === DELETE_KEY_CODE && timeChars[4] !== '-') {
      this.setState({ timeChars: deleteTimeChar(timeChars) });
      return;
    }
    if (isInvalidTimeInput(ev.key, timeChars)) {
      return;
    }
    this.setState({ timeChars: addTimeChar(timeChars, ev.key) });
  }

  enableTimePicker = () => {
    const { timeChars, timeCharsAsString } = this.state;
    let updatedTimeChars;
    if (timeCharsAsString) {
      const hourColumn = timeCharsAsString.split(':')[0];
      const hourArray = hourColumn.length > 1 ? hourColumn.split('') : ['-', hourColumn];
      updatedTimeChars = hourArray.concat(timeChars.slice(2));
    }
    this.setState({
      isTimePickerEnabled: true,
      timeChars: updatedTimeChars || timeChars,
    });
  }

  convertTo12HourFormat = (timeString) => {
    const hourColumn = Number(timeString.split(':')[0]);
    if (hourColumn === 0) {
      this.setState({ isPmSelected: false });
      return timeString.replace(hourColumn, 12);
    }
    if (hourColumn > 12) {
      this.setState({ isPmSelected: true });
      return timeString.replace(hourColumn, hourColumn - 12);
    }
    return timeString;
  }

  handleBlur = () => {
    const timeCharsAsString = formatTimeChars(this.state.timeChars);
    if (!VALID_TIME_INPUT.test(timeCharsAsString)) {
      this.setState({
        isTimePickerEnabled: false,
        timeChars: INITIAL_TIME_CHARS,
        timeCharsAsString: null,
        errorMessage: 'Please insert a valid time.',
      });
      return;
    }
    this.setState({
      isTimePickerEnabled: false,
      timeCharsAsString: this.convertTo12HourFormat(timeCharsAsString),
    });
  }

  changeDate = (calendarDate) => {
    this.setState({ calendarDate });
  }

  toggleAmPm = (ev, isPmSelected) => {
    ev.preventDefault();
    this.setState({ isPmSelected });
  }

  toggleCalendarFocus = (isCalendarFocused) => {
    this.setState({ isCalendarFocused });
  }

  updateFieldValue = (name, value) => {
    const buttonsToHighlight = {
      ...this.state.buttonsToHighlight,
      shouldScheduleTime: value,
    };
    switch (name) {
      case 'shouldScheduleTime':
        this.setState({ buttonsToHighlight }, () => {
          if (!value) {
            this.setState(resetTimeValues());
          }
        });
        break;
      default:
        this.setState({ [name]: value });
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { errorMessage, finalTimeStamp, name } = validateForm(this.state);
    if (errorMessage) {
      this.setState({ errorMessage });
      return;
    }
    const body = {
      name,
      timeScheduled: finalTimeStamp,
      ownerUserId: this.props.currentUser.uuid,
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
      buttonsToHighlight,
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
            buttonsToHighlight={buttonsToHighlight}
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
exports.validateForm = validateForm;
