import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DARK_BLUE,
} = styleVars;

const {
  CENTER_ELEMENT_MIXIN,
  MENU_TEXT_MIXIN,
} = mixins;

const TeamMenuContainer = styled.div`
  width: 60%;
  
  ${MENU_TEXT_MIXIN({ color: DARK_BLUE })}
  ${CENTER_ELEMENT_MIXIN}
`;

module.exports = {
  TeamMenuContainer,
};
