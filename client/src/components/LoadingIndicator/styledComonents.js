import styled, { keyframes } from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  CENTER_ELEMENT_MIXIN,
} = mixins;

const {
  DARK_BLUE,
  EXTRA_LARGE_FONT_SIZE,
  DEFAULT_FONT,
  PRETTY_FONT,
} = styleVars;

const rotate = keyframes`
  from {
    transform: translateX(-50%) rotate(0deg);
  }

  to {
    transform: translateX(-50%) rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  position: relative;
  margin-top: 10rem;
  height: 10rem;
`;

const LoadingSpinner = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: dashed 0.3rem ${DARK_BLUE};
  animation-name: ${rotate};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  left: 50%;
  position: absolute;
`;

const LoadingText = styled.p`
  color: ${DARK_BLUE};
  font-size: ${EXTRA_LARGE_FONT_SIZE};
  font-family: ${PRETTY_FONT}, ${DEFAULT_FONT};
`;

const LoadingTextContainer = styled.div`
  top: 100%;
  ${CENTER_ELEMENT_MIXIN}
`;

module.exports = {
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  LoadingTextContainer,
};
