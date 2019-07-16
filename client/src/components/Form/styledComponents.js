import styled from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { mixins, styleVars } from '../../styles';

const {
  NARROW_BUTTON,
  WIDE_BUTTON,
  NARROW_FORM,
  WIDE_FORM,
  NARROW_TEXT_FIELD,
  WIDE_TEXT_FIELD,
  DEFAULT_FONT,
  DARK_BLUE,
  LIGHT_GRAY,
  SKY_BLUE,
  WHITE,
} = styleVars;

const {
  P_TEXT_MIXIN,
  HEADING_TEXT_MIXIN,
  PICKER_WRAPPER_MIXIN,
  PICKER_INPUT_MIXIN,
} = mixins;

const FieldWrapper = styled.form`
  position: absolute;
  left: 50%;
  height: ${props => (props.hasContainer ? '70%' : 'inherit')};
  transform: translateX(-50%);
  background: ${WHITE};
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 3rem;
  width: ${props => (props.isWide ? WIDE_FORM : NARROW_FORM)};
  text-align: center;
`;

const Title = styled.h2`
  text-transform: uppercase;
  margin-bottom: 20px;

  ${HEADING_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TextFieldContainer = styled.div`
  height: 5rem;
`;

const FieldTitle = styled.p`
  margin: 3rem auto;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TextField = styled.input`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.6rem;
  border: 1px solid ${LIGHT_GRAY};
  border-radius: 3px;
  margin-bottom: 1rem;
  width: ${props => (props.isWide ? WIDE_TEXT_FIELD : NARROW_TEXT_FIELD)};

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const SelectTitle = styled.p`
  margin: 3rem auto;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const Select = styled.select`
  padding: 1.5rem;
  border: 1px solid ${LIGHT_GRAY};
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


const SubmitButton = styled.input`
  padding: 1.6rem;
  background-color: ${DARK_BLUE};
  border-radius: 3px;
  margin: 4rem auto 1rem;
  width: 30%;
  cursor: pointer;

  ${P_TEXT_MIXIN({ color: WHITE })}
`;

const SchedulerContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div`
  ${PICKER_WRAPPER_MIXIN({ side: 'left' })}

  height: 2.6rem;

  .SingleDatePicker {
    height: 2.6rem;
  }

  .SingleDatePickerInput__withBorder {
    border: 1px solid ${LIGHT_GRAY};
    border-radius: 3px;
  }

  .DateInput {
    width: inherit;
  }

  .DateInput_input {
    border-bottom: 0;

    ${PICKER_INPUT_MIXIN}
  }

  .CalendarDay__selected {
    background-color: ${SKY_BLUE};
  }

  .CalendarMonth {
    font-family: ${DEFAULT_FONT};

    &_table {
      margin-top: 1rem;
    }
  }

  .DayPicker {

    &_transitionContainer {
      min-height: 310px;
    }

    &_weekHeader {
      font-family: ${DEFAULT_FONT};
    }

  }
`;

const TimePickerWrapper = styled.div`
  ${PICKER_WRAPPER_MIXIN({ side: 'right' })}
`;

const TimePicker = styled.input`
  width: 100%;
  height: 2.6rem;
  border-radius: 3px;
  border: 1px solid ${LIGHT_GRAY};

  ${PICKER_INPUT_MIXIN}
`;

const Calendar = styled(SingleDatePicker)`
`;

const ErrorMessageContainer = styled.div`
  height: 1.6rem;
`;

const ErrorMessage = styled.p`
  color: #F00;
  margin: 7px auto 0;
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
  SubmitButton,
  SchedulerContainer,
  CalendarWrapper,
  Calendar,
  TimePickerWrapper,
  TimePicker,
  ErrorMessageContainer,
  ErrorMessage,
};
