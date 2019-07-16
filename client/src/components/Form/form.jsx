import React from 'react';
import PropTypes from 'prop-types';

import {
  FieldWrapper,
  Title,
  TextFieldContainer,
  FieldTitle,
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

const DAYS_IN_FIVE_WEEKS = 35;

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
  buttonsToHighlight,
  isFormWide,
  hasContainer,
}) => {
  const handleChange = (ev, dataType) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    const valueToUpdate = dataType === 'boolean' ? (value === 'true') : value;
    updateFieldValue(name, valueToUpdate);
  };
  const shouldBeShown = (dependsOn, options) => (
    options[dependsOn.name] === dependsOn.requiredOptionValue
  );
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
        dataType,
        dependsOn,
        isWide,
        fieldTitle,
      } = input;
      if (
        !enabled
        || (dependsOn && !shouldBeShown(dependsOn, buttonsToHighlight))
      ) {
        return null;
      }
      switch (type) {
        case 'text':
          return (
            <TextFieldContainer>
              {fieldTitle && <FieldTitle>{fieldTitle}</FieldTitle>}
              <TextField
                defaultValue={defaultValue || ''}
                name={name}
                key={name}
                type="text"
                placeholder={text}
                onChange={handleChange}
                isWide={isWide}
              />
            </TextFieldContainer>
          );
        case 'password':
          return (
            <TextFieldContainer>
              {fieldTitle && <FieldTitle>{fieldTitle}</FieldTitle>}
              <TextField
                name={name}
                key={name}
                type="password"
                placeholder={text}
                onChange={handleChange}
                isWide={isWide}
              />
            </TextFieldContainer>
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
              {options && options.map(op => (
                <FormButton
                  name={name}
                  key={op.label}
                  value={op.value}
                  dataType={op.dataType}
                  onClick={ev => handleChange(ev, dataType)}
                  shouldBeHighlighted={buttonsToHighlight[name] === op.value}
                  isWide={op.isWide}
                >
                  {op.label}
                </FormButton>
              ))}
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
                  numberOfMonths={1}
                  hideKeyboardShortcutsPanel
                  daySize={DAYS_IN_FIVE_WEEKS}
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
    <FieldWrapper
      isWide={isFormWide}
      hasContainer={hasContainer}
      onSubmit={handleSubmit}
    >
      <Title>{title}</Title>
      {getInputs(formInputs)}
      <ErrorMessageContainer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ErrorMessageContainer>
    </FieldWrapper>
  );
};

Form.defaultProps = {
  errorMessage: null,
  calendarDate: null,
  timeChars: null,
  changeDate: null,
  timeCharsAsString: null,
  isCalendarFocused: false,
  isFormWide: false,
  isTimePickerEnabled: false,
  toggleCalendarFocus: null,
  handleTimePickerKeyUp: null,
  enableTimePicker: null,
  isPmSelected: false,
  toggleAmPm: null,
  handleBlur: null,
  buttonsToHighlight: {},
};

Form.propTypes = {
  updateFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorMessage: PropTypes.string,
  calendarDate: PropTypes.string,
  changeDate: PropTypes.func,
  isCalendarFocused: PropTypes.bool,
  isFormWide: PropTypes.bool,
  toggleCalendarFocus: PropTypes.func,
  timeChars: PropTypes.arrayOf(PropTypes.string),
  timeCharsAsString: PropTypes.string,
  handleTimePickerKeyUp: PropTypes.func,
  isTimePickerEnabled: PropTypes.bool,
  enableTimePicker: PropTypes.func,
  isPmSelected: PropTypes.bool,
  toggleAmPm: PropTypes.func,
  handleBlur: PropTypes.func,
  buttonsToHighlight: PropTypes.objectOf(PropTypes.any),
};

export default Form;
