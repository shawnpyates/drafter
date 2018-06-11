import styled from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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
  font-size: 1.5em;
  text-transform: uppercase;
  color: #11133F;
  text-align: center;
  margin-bottom: 20px;
`;

const TextField = styled.input`
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: Arial;
  color: #2C3E50;
  font-size: 13px;
`;

const Select = styled.select`
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 3px;
  margin: 10px auto;
  height: 35px;
  width: 100%;
  box-sizing: border-box;
  font-family: Arial;
  color: #2C3E50;
  font-size: 13px;
`;

const SelectTitle = styled.p`
  margin-top: 15px;
`;

const SubmitButton = styled.input`
  display: block;
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 3px;
  margin: 15px auto 10px;
  width: 30%;
  box-sizing: border-box;
  font-family: Arial;
  color: #2C3E50;
  font-size: 13px;
  float: center;
  cursor: pointer;
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
