import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

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
  TimePickerWrapper,
  TimePicker,
  ErrorMessageContainer,
  ErrorMessage,
} from './styledComponents';

function Form({
  buttonsToHighlight,
  changeDate,
  calendarDate,
  enableTimePicker,
  errorMessage,
  formInputs,
  handleBlur,
  handleSubmit,
  handleTimePickerKeyUp,
  hasContainer,
  isCalendarFocused,
  isFormWide,
  isPmSelected,
  isTimePickerEnabled,
  preexistingValues,
  title,
  timeChars,
  timeCharsAsString,
  toggleAmPm,
  toggleCalendarFocus,
  updateFieldValue,
}) {
  const handleChange = (ev, dataType) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    const valueToUpdate = dataType === 'boolean' ? (value === 'true') : value;
    updateFieldValue({ name, value: valueToUpdate });
  };
  const shouldBeShown = (dependsOn, options) => (
    options[dependsOn.name] === dependsOn.requiredOptionValue
  );
  const useOutsideClickHandler = (ref) => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleCalendarFocus(false);
      }
    }
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  }
  const calendarRef = useRef(null);
  useOutsideClickHandler(calendarRef);
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
            <TextFieldContainer key={name}>
              {fieldTitle && <FieldTitle>{fieldTitle}</FieldTitle>}
              <TextField
                defaultValue={(preexistingValues && preexistingValues[name]) || defaultValue || ''}
                name={name}
                type="text"
                placeholder={text}
                onChange={handleChange}
                isWide={isWide}
              />
            </TextFieldContainer>
          );
        case 'password':
          return (
            <TextFieldContainer key={name}>
              {fieldTitle && <FieldTitle>{fieldTitle}</FieldTitle>}
              <TextField
                name={name}
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
              <CalendarWrapper isCalendarFocused={isCalendarFocused}>
                {isCalendarFocused
                  ? (
                    <div ref={calendarRef}>
                      <Calendar
                        value={calendarDate}
                        onChange={date => changeDate(date)}
                        minDate={new Date()}
                      />
                    </div>
                    )
                    : (
                      
                      <TimePicker
                        value={
                          calendarDate
                          ? dayjs(calendarDate).format('MMM D, YYYY')
                          : 'Set Date'
                        }
                        onClick={() => toggleCalendarFocus(true)}
                        readOnly
                      />
                  )

                }
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
}

Form.defaultProps = {
  buttonsToHighlight: {},
  calendarDate: null,
  changeDate: null,
  enableTimePicker: null,
  errorMessage: null,
  handleBlur: null,
  hasContainer: false,
  handleTimePickerKeyUp: null,
  isCalendarFocused: false,
  isFormWide: false,
  isPmSelected: false,
  isTimePickerEnabled: false,
  preexistingValues: null,
  timeChars: null,
  timeCharsAsString: null,
  toggleAmPm: null,
  toggleCalendarFocus: null,
};

Form.propTypes = {
  buttonsToHighlight: PropTypes.objectOf(PropTypes.any),
  calendarDate: PropTypes.objectOf(PropTypes.any),
  changeDate: PropTypes.func,
  enableTimePicker: PropTypes.func,
  errorMessage: PropTypes.string,
  formInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  handleTimePickerKeyUp: PropTypes.func,
  hasContainer: PropTypes.bool,
  isCalendarFocused: PropTypes.bool,
  isFormWide: PropTypes.bool,
  isPmSelected: PropTypes.bool,
  isTimePickerEnabled: PropTypes.bool,
  preexistingValues: PropTypes.objectOf(PropTypes.any),
  timeChars: PropTypes.arrayOf(PropTypes.string),
  timeCharsAsString: PropTypes.string,
  title: PropTypes.string.isRequired,
  toggleAmPm: PropTypes.func,
  toggleCalendarFocus: PropTypes.func,
  updateFieldValue: PropTypes.func.isRequired,
};

export default Form;
