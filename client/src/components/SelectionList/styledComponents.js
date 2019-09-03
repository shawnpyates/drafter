import styled from 'styled-components';

import { styleVars } from '../../styles';

const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
} = styleVars;

const Container = styled.div`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 20%;
  width: 20%;
  margin-top: 5rem;
`;

const ListTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  border: 1px solid #000;
  margin: 2rem auto;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  width: 60%;
  display: inline-block;
  cursor: ${props => (props.type === 'Players' ? 'pointer' : 'unset')};
  background-color: ${props => (props.isCurrentlySelecting || props.isFocussed ? SKY_BLUE : WHITE)};
`;

const SelectButton = styled.button`
  background: ${DARK_BLUE};
  height: 2.5rem;
  width: 8.5rem;
  border-radius: 2rem;
  margin-left: 2rem;
  text-align: center;
  font-weight: 500;
  color: ${WHITE};
  cursor: pointer;

  &:hover {
    color: ${SKY_BLUE};
    text-decoration: none;
  }
`;

module.exports = {
  Container,
  ListTitle,
  List,
  ListItem,
  SelectButton,
};
