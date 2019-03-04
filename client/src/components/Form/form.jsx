import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import {
  FieldWrapper,
  Title,
  TextField,
  Select,
  SelectTitle,
  SubmitButton,
  SchedulerContainer,
  CalendarWrapper,
  Calendar,
  ErrorMessageContainer,
  ErrorMessage,
} from './styledComponents';

const now = moment();

const Form = ({
  updateFieldValue,
  handleSubmit,
  title,
  formInputs,
  errorMessage,
  calendarDate,
  changeDate,
  changeTime,
  timeFormat,
  isCalendarFocused,
  toggleCalendarFocus,
}) => {
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    updateFieldValue(name, value);
  };
  const getInputs = inputs => (
    inputs.map((input) => {
      const {
        name,
        text,
        placeholder,
        options,
        type,
        enabled,
        defaultValue,
      } = input;
      if (!enabled) return null;
      switch (type) {
        case 'text':
          return (
            <TextField
              defaultValue={defaultValue || ''}
              name={name}
              key={name}
              type="text"
              placeholder={text}
              onChange={handleChange}
            />
          );
        case 'password':
          return (
            <TextField
              name={name}
              key={name}
              type="password"
              placeholder={text}
              onChange={handleChange}
            />
          );
        case 'submit':
          return (
            <SubmitButton
              name={name}
              key={name}
              type="submit"
              value={text}
              onSubmit={handleSubmit}
            />
          );
        case 'select':
          return (
            <div key={name}>
              <SelectTitle>{text}</SelectTitle>
              <Select
                defaultValue={defaultValue || placeholder}
                name={name}
                onChange={handleChange}
              >
                <option disabled>{placeholder}</option>
                {options.map(op => <option key={op}>{op}</option>)}
              </Select>
            </div>
          );
        case 'scheduler':
          return (
            <SchedulerContainer key={name}>
              <SelectTitle>{text}</SelectTitle>
              <CalendarWrapper>
                <Calendar
                  date={calendarDate}
                  onDateChange={date => changeDate(date)}
                  focused={isCalendarFocused}
                  onFocusChange={({ focused }) => toggleCalendarFocus(focused)}
                  id={name}
                  showCaret={false}
                  openDirection="up"
                />
              </CalendarWrapper>
              <TimePicker
                showSecond={false}
                defaultValue={now}
                className="xxx"
                onChange={changeTime}
                format={timeFormat}
                use12Hours
              />
            </SchedulerContainer>
          );
        default:
          return null;
      }
    })
  );

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Title>{title}</Title>
        {getInputs(formInputs)}
        <ErrorMessageContainer>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorMessageContainer>
      </FieldWrapper>
    </form>
  );
};

Form.defaultProps = {
  errorMessage: null,
};

Form.propTypes = {
  updateFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorMessage: PropTypes.string,
};

export default Form;
