import styled from 'styled-components';

import { mixins } from '../../styles';

const MainMenuContainer = styled.div`
  ${mixins.CONTAINER_MIXIN}
`;

const WelcomeMessage = styled.h2`
  margin-top: 5rem;
`;

module.exports = {
  MainMenuContainer,
  WelcomeMessage,
};
