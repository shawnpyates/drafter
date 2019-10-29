import React from 'react';

import {
  ErrorContainer,
  ErrorText,
  ErrorTextContainer,
} from './styledComponents';

const ErrorIndicator = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorTextContainer>
        <ErrorText>{message}</ErrorText>
      </ErrorTextContainer>
    </ErrorContainer>
  );
};

export default ErrorIndicator;