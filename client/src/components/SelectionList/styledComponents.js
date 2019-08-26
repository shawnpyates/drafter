import styled from 'styled-components';

import { styleVars } from '../../styles';

const {
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

const ListItem = styled.div`
  border: 1px solid #000;
  margin: 2rem auto;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  width: 60%;
  background-color: ${props => (props.isCurrentlySelecting ? SKY_BLUE : WHITE)}
`;

module.exports = {
  Container,
  ListTitle,
  ListItem,
};
