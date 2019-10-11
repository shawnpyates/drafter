import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
} = styleVars;

const {
  P_TEXT_MIXIN,
  VERTICALLY_CENTER_CONTENT_MIXIN,
} = mixins;

const NotificationContainer = styled.div`
  position: fixed;
  top: 8rem;
  right: 10rem;
  max-width: 20%;
  min-height: 15vh;
  background: ${WHITE};
  padding: 3rem;
  border-radius: 2px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  cursor: pointer;

  ${VERTICALLY_CENTER_CONTENT_MIXIN}

  &:hover {
    background: ${SKY_BLUE}
  }
`;

const NotificationText = styled.p`
  ${P_TEXT_MIXIN({ color: DARK_BLUE })}
`;

module.exports = {
  NotificationContainer,
  NotificationText,
};
