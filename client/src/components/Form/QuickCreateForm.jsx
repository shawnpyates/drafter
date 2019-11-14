import React from 'react';
import PropTypes from 'prop-types';

import {
  FieldWrapper,
  Title,
  ErrorMessageContainer,
  ErrorMessage,
  Select,
  SelectTitle,
  SubmitContainer,
  SubmitButton,
  QuickCreateTextContainer,
  QuickCreateSelectContainer,
  QuickCreateTextField,
  AddRowButtonContainer,
  RemoveRowButtonContainer,
  RowButton,
} from './styledComponents';

function QuickCreateForm({
  errorMessage,
  formInputs,
  updateFieldValue,
  title,
  handleSubmit,
  currentValues,
}) {
  const handleChange = (ev, index) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    updateFieldValue({ name, value, index });
  };
  const handleRowNumberChange = (ev, changeVal, index) => {
    ev.preventDefault();
    updateFieldValue({ rowNumChangeVal: changeVal, index });
  };
  const inputs = currentValues.map((val, i) => {
    const contentInputs = formInputs.map((input) => {
      const {
        name,
        text,
        defaultValue = '',
        type,
        options,
        placeholder,
      } = input;
      switch (type) {
        case 'text':
          return (
            <QuickCreateTextContainer key={name}>
              <QuickCreateTextField
                defaultValue={defaultValue}
                name={name}
                type="text"
                placeholder={text}
                onChange={ev => handleChange(ev, i)}
                value={val[name]}
              />
            </QuickCreateTextContainer>
          );
        case 'select':
          return (
            <QuickCreateSelectContainer key={name}>
              <SelectTitle hasNoMargin>{text}</SelectTitle>
              <Select
                defaultValue={defaultValue || placeholder}
                name={name}
                onChange={ev => handleChange(ev, i)}
                value={val[name]}
              >
                <option disabled>{placeholder}</option>
                {options.map(op => <option key={op}>{op}</option>)}
              </Select>
            </QuickCreateSelectContainer>
          );
        default:
          return null;
      }
    });
    return (
      <div key={val.id}>
        {contentInputs}
        <RemoveRowButtonContainer>
          {i > 0
          && (
            <RowButton
              onClick={ev => handleRowNumberChange(ev, -1, i)}
              type="button"
              value="❌"
            />
          )}
        </RemoveRowButtonContainer>
      </div>
    );
  });
  const submitButtonData = formInputs.find(data => data.type === 'submit');
  return (
    <FieldWrapper
      isWide
      onSubmit={handleSubmit}
    >
      <Title>{title}</Title>
      {inputs}
      <AddRowButtonContainer>
        <RowButton
          onClick={ev => handleRowNumberChange(ev, 1)}
          type="button"
          value="+ Add Another"
        />
      </AddRowButtonContainer>
      <SubmitContainer>
        <SubmitButton
          name={submitButtonData.name}
          type="submit"
          value={submitButtonData.text}
          onSubmit={handleSubmit}
        />
      </SubmitContainer>
      <ErrorMessageContainer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ErrorMessageContainer>
    </FieldWrapper>
  );
}

QuickCreateForm.defaultProps = {
  errorMessage: null,
};

QuickCreateForm.propTypes = {
  currentValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorMessage: PropTypes.string,
  formInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
};

export default QuickCreateForm;
