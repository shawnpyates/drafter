import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Form from '../../components/Form/form.jsx';
import { createDraft, updateView } from '../../actions';
import { draft as draftForm } from '../../../formConstants.json';

const scheduledTime = draftForm.inputs.find(input => input.name === 'scheduledTime');

const timeFormat = 'hh:mm a';

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const mapDispatchToProps = dispatch => ({
  createDraft: body => dispatch(createDraft(body)),
  updateView: view => dispatch(updateView(view)),
});

const extractDataForTable = drafts => (
  drafts.map((draft) => {
    const { name, timeScheduled } = draft;
    return { name, timeScheduled };
  })
);

const get24HourTime = (timeString) => {
  if (timeString[timeString.length - 2] === 'a') {
    return timeString.substring(0, 5);
  } else {
    const modifiedHour = Number(timeString.substring(0, 2)) + 12;
    return `${modifiedHour}${timeString.substring(2, 5)}`;
  }
}

const createFinalTimestamp = (date, time) => date.replace('12:00:00', `${time}:00`);

class CreateDraft extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      shouldScheduleTime: null,
      calendarDate: null,
      time: null,
      isCalendarFocused: false,
    };
  }

  componentDidMount() {
    this.setState({ calendarDate: moment() });
  }

  returnToMainMenu = () => {
    this.props.updateView('mainMenu');
  }

  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  changeDate = (calendarDate) => {
    this.setState({ calendarDate })
  }

  changeTime = (time) => {
    this.setState({ time });
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
      creator: this.props.currentUser,
    };
    this.props.createDraft(body);
  }


  render() {
    const { ownDrafts } = this.props;
    const {
      errorMessage,
      calendarDate,
      isCalendarFocused,
    } = this.state;
    return (
      <div>
        <Form
          updateFieldValue={this.updateFieldValue}
          handleSubmit={this.handleSubmit}
          title={draftForm.title}
          formInputs={draftForm.inputs}
          errorMessage={errorMessage}
          calendarDate={calendarDate}
          changeDate={this.changeDate}
          changeTime={this.changeTime}
          timeFormat={timeFormat}
          isCalendarFocused={isCalendarFocused}
          toggleCalendarFocus={this.toggleCalendarFocus}
        />
      </div>
    );
  }
}

CreateDraft.propTypes = {
  createDraft: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  updateView: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDraft);
