import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { HEADING_TEXT_MIXIN } = mixins;
const { DARK_BLUE } = styleVars;

const MainMenuContainer = styled.div`
  position: absolute;
  width: 60%;
  left: 50%;
  transform: translateX(-50%);

  ${HEADING_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const WelcomeMessage = styled.h2`
  margin-top: 5rem;
`;

module.exports = {
  MainMenuContainer,
  WelcomeMessage,
};
