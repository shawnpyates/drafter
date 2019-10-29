import React from 'react';

import {
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  LoadingTextContainer,
} from './styledComponents';

const LoadingIndicator = () => (
  <LoadingContainer>
    <LoadingSpinner />
    <LoadingTextContainer>
      <LoadingText>Loading...</LoadingText>
    </LoadingTextContainer>
  </LoadingContainer>
);

export default LoadingIndicator;