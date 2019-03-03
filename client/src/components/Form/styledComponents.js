import styled from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { mixins, styleVars } from '../../styles';

const { DARK_BLUE } = styleVars;
const { P_TEXT_MIXIN, HEADING_TEXT_MIXIN } = mixins;

const FieldWrapper = styled.div`
  background: white;
  border: 0 none;
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;

  ${HEADING_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TextField = styled.input`
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const Select = styled.select`
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 3px;
  margin: 10px auto;
  height: 35px;
  width: 100%;
  box-sizing: border-box;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const SelectTitle = styled.p`
  margin-top: 15px;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const SubmitButton = styled.input`
  display: block;
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 3px;
  margin: 15px auto 10px;
  width: 30%;
  box-sizing: border-box;
  float: center;
  cursor: pointer;

  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const SchedulerContainer = styled.div`
`;

const Calendar = styled(SingleDatePicker)`
  float: left;
`;

const ErrorMessageContainer = styled.div`
  height: 15px;
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
  Calendar,
  ErrorMessageContainer,
  ErrorMessage,
};
