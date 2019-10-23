import styled from 'styled-components';

import { styleVars } from '../../styles';


const { DEFAULT_FONT } = styleVars;

const AppContainer = styled.div`
  font-family: ${DEFAULT_FONT};
`;

module.exports = {
  AppContainer,
};
