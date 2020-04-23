import styled from 'styled-components';

import { styleVars } from '../../styles';

const {
  DARK_GRAY,
  SKY_BLUE,
  WHITE,
  SMALL_FONT_SIZE,
} = styleVars;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 3rem;
  height: 5rem;
`;

const TabListItem = styled.button`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 35%;
  padding: 5px;
  text-decoration: none;
  color: #1AB188;
  transition: 0.5s ease;
  background: ${DARK_GRAY};
  color: ${WHITE};
  font-size: ${SMALL_FONT_SIZE};
  width: 10%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: ${SKY_BLUE};
    color: ${WHITE};
  }
`;


module.exports = {
  TabList,
  TabListItem,
};
