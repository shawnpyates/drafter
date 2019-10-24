import React from 'react';

import {
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  LoadingTextContainer,
} from './styledComonents';

const LoadingIndicator = () => (
  <LoadingContainer>
    <LoadingSpinner />
    <LoadingTextContainer>
      <LoadingText>Loading...</LoadingText>
    </LoadingTextContainer>
  </LoadingContainer>
);

export default LoadingIndicator;