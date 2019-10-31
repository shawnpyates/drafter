import React from 'react';
import PropTypes from 'prop-types';

import {
  ErrorContainer,
  ErrorText,
  ErrorTextContainer,
} from './styledComponents';

const ErrorIndicator = ({ message }) => (
  <ErrorContainer>
    <ErrorTextContainer>
      <ErrorText>{message}</ErrorText>
    </ErrorTextContainer>
  </ErrorContainer>
);

ErrorIndicator.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorIndicator;
