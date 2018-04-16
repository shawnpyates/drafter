import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

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

const ErrorMessageContainer = styled.div`
  height: 15px;
`;

const ErrorMessage = styled.p`
  color: #F00;
  margin: 7px auto 0;
`;

const Form = ({
  updateFieldValue,
  handleSubmit,
  title,
  formInputs,
  errorMessage,
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
      } = input;
      if (!enabled) return null;
      switch (type) {
        case 'text':
          return (
            <TextField
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
              <Select defaultValue={placeholder} name={name} onChange={handleChange}>
                <option disabled>{placeholder}</option>
                {options.map(op => <option key={op}>{op}</option>)}
              </Select>
            </div>
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
