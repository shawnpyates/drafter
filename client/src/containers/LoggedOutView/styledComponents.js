import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { HEADING_TEXT_MIXIN, CENTER_ELEMENT_MIXIN } = mixins;
const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
  LARGE_FONT_SIZE,
} = styleVars;

const FormContainer = styled.div`
  background: ${DARK_BLUE};
  padding: 4rem;
  margin: 4rem auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  height: 65rem;
  width: 40%;

  ${HEADING_TEXT_MIXIN({ color: DARK_BLUE })}
  ${CENTER_ELEMENT_MIXIN}
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TabListItem = styled.div`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 25%;
  text-decoration: none;
  color: #1AB188;
  transition: 0.5s ease;
  background: ${WHITE};
  color: #CCC;
  font-size: ${LARGE_FONT_SIZE};
  width: 25%;
  text-align: center;
  border: 1px solid ${DARK_BLUE};
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: ${SKY_BLUE};
    color: ${WHITE};
  }
`;

const TabListAnchor = styled.a``;

const TabListContainer = styled.div`
  height: 15%;
`;

module.exports = {
  FormContainer,
  TabList,
  TabListAnchor,
  TabListItem,
  TabListContainer,
};
