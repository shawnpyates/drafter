import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  ErrorMessageContainer,
  ErrorMessage,
} from './styledComponents';

function QuickCreateForm({
  errorMessage,
  formInputs,
  handleSubmit,
}) {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const getInputs = numberOfRows.map(() => (
    formInputs.map((input) => {
      const {
        name,
        text,
        defaultValue = '',
      } = input;
      return (
        <div key={name}>
          <TextField
            defaultValue={defaultValue}
            name={name}
            type="text"
            placeholder={text}
          />
        </div>
      );
    })
  ));
  return (
    <div>
      {getInputs(formInputs)}
      <button onClick={() => setNumberOfRows(numberOfRows + 1)}>Add Row</button>
      <ErrorMessageContainer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ErrorMessageContainer>
    </div>
  );
}

QuickCreateForm.defaultProps = {
  errorMessage: null,
};

QuickCreateForm.propTypes = {
  errorMessage: PropTypes.string,
  formInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default QuickCreateForm;
