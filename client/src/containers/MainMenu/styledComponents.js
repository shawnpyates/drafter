import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { HEADING_TEXT_MIXIN } = mixins;
const { DARK_BLUE } = styleVars;

const MainMenuContainer = styled.div`
  ${HEADING_TEXT_MIXIN(DARK_BLUE)}
`;

const WelcomeMessage = styled.h2`
  margin-left: 27%;
  margin-top: 50px;
`;

module.exports = {
  MainMenuContainer,
  WelcomeMessage,
};
