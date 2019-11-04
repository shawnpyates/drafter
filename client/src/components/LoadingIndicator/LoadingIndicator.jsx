import React from 'react';

import {
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  LoadingTextContainer,
} from './styledComponents';

function LoadingIndicator() {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingTextContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingTextContainer>
    </LoadingContainer>
  );
}

export default LoadingIndicator;
