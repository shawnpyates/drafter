import styled from 'styled-components';

import { styleVars } from '../../styles';

const {
  DARK_BLUE,
  LARGE_FONT_SIZE,
  EXTRA_LARGE_FONT_SIZE,
} = styleVars;


const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.div`
  color: ${DARK_BLUE};
  margin: 3rem;
  font-size: ${EXTRA_LARGE_FONT_SIZE};
`;

const ListItem = styled.div`
  height: 5rem;
  width: 30%;
  border: 1px solid black;
  margin: 2rem;
  display: inline-block;
  text-align: left;
  position: relative;
`;

const ListItemText = styled.p`
  color: ${DARK_BLUE};
  font-size: ${LARGE_FONT_SIZE};
  margin-left: 1rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

module.exports = {
  Container,
  ListItem,
  ListItemText,
  Title,
};
