import styled from 'styled-components';

import { styleVars } from '../../styles';

const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
  LARGE_FONT_SIZE,
} = styleVars;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  height: 5rem;
  margin-top: 3rem;
`;

const TabListItem = styled.div`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 25%;
  text-decoration: none;
  transition: 0.5s ease;
  background: ${WHITE};
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

module.exports = {
  TabList,
  TabListItem,
};
