import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DARK_BLUE,
  WHITE,
  LARGE_FONT_SIZE,
} = styleVars;

const {
  VERTICALLY_CENTER_CONTENT_MIXIN,
} = mixins;

const InfoContainer = styled.div`
  height: 5rem;
  background: ${WHITE};
  padding: 3rem;
  text-align: center;

  ${VERTICALLY_CENTER_CONTENT_MIXIN}
`;

const InfoText = styled.p`
  color: ${DARK_BLUE};
  font-size: ${LARGE_FONT_SIZE};
`;

module.exports = {
  InfoContainer,
  InfoText,
};
