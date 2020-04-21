import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
} = styleVars;

const { CENTER_ELEMENT_MIXIN, P_TEXT_MIXIN } = mixins;

const ButtonContainer = styled.div`
  height: 8rem;
`;

const ButtonInput = styled.input`
  padding: 1.6rem;
  background-color: ${DARK_BLUE};
  border-radius: 3px;
  margin: 6rem auto 1rem;
  cursor: pointer;
  ${props => (
    props.isCenter
      ? `
        margin: 6rem auto 1rem;
        min-width: 10%; 
        ${CENTER_ELEMENT_MIXIN}
      `
      : 'margin: 6rem 3rem;'
  )}
  ${P_TEXT_MIXIN({ color: WHITE })}

  &:hover {
    color: ${SKY_BLUE};
  }
`;

module.exports = {
  ButtonContainer,
  ButtonInput,
};
