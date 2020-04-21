import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { CENTER_ELEMENT_MIXIN, MENU_TEXT_MIXIN } = mixins;
const { DARK_BLUE } = styleVars;

const MainMenuContainer = styled.div`
  min-width: 55rem;

  ${MENU_TEXT_MIXIN({ color: DARK_BLUE })}
  ${CENTER_ELEMENT_MIXIN}
`;

const WelcomeMessage = styled.h2`
  margin-top: 5rem;
`;

module.exports = {
  MainMenuContainer,
  WelcomeMessage,
};
