import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';


const { DEFAULT_FONT } = styleVars;

const CENTER_ELEMENT_MIXIN = mixins;


const AppContainer = styled.div`
  font-family: ${DEFAULT_FONT};
`;

const Loading = styled.div`
  ${CENTER_ELEMENT_MIXIN}
`;

module.exports = {
  AppContainer,
  Loading,
};
