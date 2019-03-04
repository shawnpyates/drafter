import styled from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { mixins, styleVars } from '../../styles';

const { DARK_BLUE, LIGHT_GRAY, WHITE } = styleVars;
const { P_TEXT_MIXIN, HEADING_TEXT_MIXIN } = mixins;

const FieldWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: ${WHITE};
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 3rem;
  width: 40%;
  text-align: center;
`;

const Title = styled.h2`
  text-transform: uppercase;
  margin-bottom: 20px;

  ${HEADING_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TextField = styled.input`
  padding: 1.6rem;
  border: 1px solid ${LIGHT_GRAY};
  border-radius: 3px;
  margin-bottom: 1rem;
  width: 100%;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const SelectTitle = styled.p`
  margin: 1.6rem auto;

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


const SubmitButton = styled.input`
  padding: 1.6rem;
  background-color: ${DARK_BLUE};
  border-radius: 3px;
  margin: 1.6rem auto 1rem;
  width: 30%;
  cursor: pointer;

  ${P_TEXT_MIXIN({ color: WHITE })}
`;

const SchedulerContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  left: 2rem;

  .SingleDatePickerInput__withBorder {
    border-radius: 3px;
  }

  .DateInput_input {
    height: 2.6rem;
  }
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
  TextField,
  Select,
  SelectTitle,
  SubmitButton,
  SchedulerContainer,
  CalendarWrapper,
  Calendar,
  ErrorMessageContainer,
  ErrorMessage,
};
