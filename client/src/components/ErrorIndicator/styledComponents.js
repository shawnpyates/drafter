import styled from 'styled-components';

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

const ErrorContainer = styled.div`
  position: relative;
  margin-top: 10rem;
  height: 10rem;
`;

const ErrorText = styled.p`
  color: ${DARK_BLUE};
  font-size: ${EXTRA_LARGE_FONT_SIZE};
  font-family: ${PRETTY_FONT}, ${DEFAULT_FONT};
`;

const ErrorTextContainer = styled.div`
  top: 100%;
  ${CENTER_ELEMENT_MIXIN}
`;

module.exports = {
  ErrorContainer,
  ErrorText,
  ErrorTextContainer,
};
