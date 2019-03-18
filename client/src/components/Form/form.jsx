import React from 'react';
import PropTypes from 'prop-types';

import {
  FieldWrapper,
  Title,
  TextField,
  Select,
  SelectTitle,
  FormButton,
  SubmitButton,
  SchedulerContainer,
  CalendarWrapper,
  Calendar,
  TimePickerWrapper,
  TimePicker,
  ErrorMessageContainer,
  ErrorMessage,
} from './styledComponents';

const Form = ({
  updateFieldValue,
  handleSubmit,
  title,
  formInputs,
  errorMessage,
  calendarDate,
  changeDate,
  isCalendarFocused,
  toggleCalendarFocus,
  timeChars,
  timeCharsAsString,
  handleTimePickerKeyUp,
  isTimePickerEnabled,
  enableTimePicker,
  isPmSelected,
  toggleAmPm,
  handleBlur,
  shouldScheduleTime,
  buttonToHighlight,
}) => {
  const handleChange = (ev, dataType) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    const valueToUpdate = dataType === 'boolean' ? (value === 'true') : value;
    updateFieldValue(name, valueToUpdate);
  };
  const getInputs = inputs => (
    inputs.map((input) => {
      const {
        name,
        text,
        placeholder,
        options,
        buttons,
        type,
        enabled,
        defaultValue,
        dataType,
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
        case 'buttonGroup':
          return (
            <div key={name}>
              <SelectTitle>{text}</SelectTitle>
              {buttons.map(btn => (
                <FormButton
                  name={name}
                  key={btn.label}
                  value={btn.value}
                  dataType={btn.dataType}
                  onClick={ev => handleChange(ev, dataType)}
                  shouldBeHighlighted={buttonToHighlight === btn.value}
                >
                  {btn.label}
                </FormButton>
              ))}
            </div>

          );
        case 'scheduler':
          return shouldScheduleTime && (
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
                  numberOfMonths={1}
                  hideKeyboardShortcutsPanel
                  daySize={35}
                />
              </CalendarWrapper>
              <TimePickerWrapper>
                <TimePicker
                  value={
                    isTimePickerEnabled
                    ? timeChars.join('')
                    : (timeCharsAsString || 'Set Time')
                  }
                  name="timePicker"
                  key={name}
                  type="text"
                  placeholder="Set time"
                  onChange={handleChange}
                  onKeyUp={handleTimePickerKeyUp}
                  onFocus={enableTimePicker}
                  onBlur={handleBlur}
                />
                <FormButton
                  shouldBeHighlighted={!isPmSelected}
                  onClick={ev => toggleAmPm(ev, false)}
                >
                  AM
                </FormButton>
                <FormButton
                  shouldBeHighlighted={isPmSelected}
                  onClick={ev => toggleAmPm(ev, true)}
                >
                  PM
                </FormButton>
              </TimePickerWrapper>
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
