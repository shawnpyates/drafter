import styled from 'styled-components';

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
`;

module.exports = {
  Container,
  ListTitle,
  ListItem,
};
