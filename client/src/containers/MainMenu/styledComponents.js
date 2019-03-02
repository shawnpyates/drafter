import styled from 'styled-components';
import { DEFAULT_FONT, NORMAL_FONT_SIZE } from '../../../globalStyles';

const MainMenuContainer = styled.div`
  font-size: ${NORMAL_FONT_SIZE};
  font-family: ${DEFAULT_FONT};
`;

const WelcomeMessage = styled.h2`
  margin-left: 27%;
  margin-top: 50px;
`;

module.exports = {
  MainMenuContainer,
  WelcomeMessage,
};
