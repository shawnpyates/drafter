import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { CENTER_ELEMENT_MIXIN } = mixins;
const { DARK_GRAY } = styleVars;

const Container = styled.div`
  text-align: center;
  border: 1px solid ${DARK_GRAY};
  width: 15%;
  height: 3rem;
  ${CENTER_ELEMENT_MIXIN};
`;

module.exports = { Container };
