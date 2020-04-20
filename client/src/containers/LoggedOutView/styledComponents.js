import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { MENU_TEXT_MIXIN } = mixins;
const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
  LARGE_FONT_SIZE,
  DARK_GRAY,
} = styleVars;

const FormContainer = styled.div`
  padding: 4rem;
  margin: 4rem auto;
  border-radius: 4px;
  height: 65rem;

  ${MENU_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TabListItem = styled.button`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 35%;
  padding: 15px;
  text-decoration: none;
  color: #1AB188;
  transition: 0.5s ease;
  background: ${DARK_GRAY};
  color: ${WHITE};
  font-size: ${LARGE_FONT_SIZE};
  width: 10%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: ${SKY_BLUE};
    color: ${WHITE};
  }
`;

const TabListContainer = styled.div`
  height: 15%;
`;

module.exports = {
  FormContainer,
  TabList,
  TabListItem,
  TabListContainer,
};
