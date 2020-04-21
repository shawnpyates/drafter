import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  NARROW_BUTTON,
  WIDE_BUTTON,
  NARROW_FORM,
  WIDE_FORM,
  NARROW_TEXT_FIELD,
  WIDE_TEXT_FIELD,
  DARK_BLUE,
  LIGHT_GRAY,
  WHITE,
  EXTRA_SMALL_FONT_SIZE,
  EXTRA_LARGE_FONT_SIZE,
} = styleVars;

const {
  P_TEXT_MIXIN,
  PICKER_WRAPPER_MIXIN,
  PICKER_INPUT_MIXIN,
  CENTER_ELEMENT_MIXIN,
} = mixins;

const FieldWrapper = styled.form`
  background: ${WHITE};
  border-radius: 3px;

  padding: 3rem;
  width: ${props => (props.isWide ? WIDE_FORM : NARROW_FORM)};
  text-align: center;
  min-width: 30rem;

  ${CENTER_ELEMENT_MIXIN}

`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: ${EXTRA_LARGE_FONT_SIZE};
  margin-bottom: 30px;
  color: ${DARK_BLUE};
  font-weight: 500;
`;

const TextFieldContainer = styled.div`
  min-height: 7rem;
`;

const FieldTitle = styled.p`
  margin: 3rem auto;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TextField = styled.input`
  padding: 1.6rem;
  border-radius: 3px;
  margin-bottom: 1rem;
  width: ${props => (props.isWide ? WIDE_TEXT_FIELD : NARROW_TEXT_FIELD)};

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
  ${CENTER_ELEMENT_MIXIN}
`;

const SelectTitle = styled.p`
  margin: ${props => (props.hasNoMargin ? 'auto' : '3rem auto')};

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const Select = styled.select`
  padding: 1.5rem;
  border-radius: 3px;
  margin: 1rem auto;
  height: 3.5rem;
  width: 100%;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const FormButton = styled.button`
  margin: 1rem 3px;
  background-color: ${props => (props.shouldBeHighlighted ? DARK_BLUE : LIGHT_GRAY)};
  color: ${props => (props.shouldBeHighlighted ? WHITE : DARK_BLUE)};
  border-radius: 3px;
  padding: 1rem;
  min-width: ${props => (props.isWide ? WIDE_BUTTON : NARROW_BUTTON)};
  cursor: pointer;

  ${P_TEXT_MIXIN({})}
`;

const SubmitContainer = styled.div`
`;

const SubmitButton = styled.input`
  padding: 1.6rem;
  background-color: ${DARK_BLUE};
  border-radius: 3px;
  margin: 6rem auto 1rem;
  min-width: 30%;
  cursor: pointer;

  ${P_TEXT_MIXIN({ color: WHITE })}
`;

const SchedulerContainer = styled.div`
  position: relative;
  height: 12rem;
`;

const CalendarWrapper = styled.div`
  ${props => PICKER_WRAPPER_MIXIN({ side: 'left', isCalendarFocused: props.isCalendarFocused })}
  height: 2.6rem;
`;

const TimePickerWrapper = styled.div`
  ${PICKER_WRAPPER_MIXIN({ side: 'right' })}
`;

const TimePicker = styled.input`
  width: 100%;
  height: 2.6rem;
  border-radius: 3px;

  ${PICKER_INPUT_MIXIN}
`;

const ErrorMessageContainer = styled.div`
  height: 1.6rem;
`;

const ErrorMessage = styled.p`
  color: #F00;
  margin: 7px auto 0;
`;

const QuickCreateInputContainer = styled.div`
  display: inline-block;
  width: ${props => props.width};
`;

const QuickCreateTextField = styled.input`
  padding: 1.6rem;
  border-radius: 3px;
  margin-bottom: 1rem;
  width: 80%;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const AddRowButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-left: 5rem;
  width: 10%;
`;

const RemoveRowButtonContainer = styled.div`
  display: inline-block;
  width: 0;
`;

const RowButton = styled.input`
  background-color: ${LIGHT_GRAY};
  border-radius: 3px;
  float: left;
  margin-left: 3rem;
  padding: 0.5rem;
  font-size: ${EXTRA_SMALL_FONT_SIZE};
  cursor: pointer;
`;

module.exports = {
  FieldWrapper,
  Title,
  TextFieldContainer,
  FieldTitle,
  TextField,
  Select,
  SelectTitle,
  FormButton,
  SubmitContainer,
  SubmitButton,
  SchedulerContainer,
  CalendarWrapper,
  TimePickerWrapper,
  TimePicker,
  ErrorMessageContainer,
  ErrorMessage,
  QuickCreateInputContainer,
  QuickCreateTextField,
  AddRowButtonContainer,
  RemoveRowButtonContainer,
  RowButton,
};
