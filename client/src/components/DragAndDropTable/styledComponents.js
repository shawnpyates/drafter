import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { CENTER_ELEMENT_MIXIN } = mixins;

const {
  DARK_BLUE,
  LIGHT_GRAY,
  DARK_GRAY,
  NORMAL_FONT_SIZE,
  LARGE_FONT_SIZE,
  EXTRA_LARGE_FONT_SIZE,
} = styleVars;

const Container = styled.div`
  width: 100%;
  text-align: center;
  filter: ${props => (props.shouldBlur ? 'blur(5px)' : 'unset')};
`;

const Title = styled.div`
  color: ${DARK_BLUE};
  margin: 1rem;
  font-size: ${EXTRA_LARGE_FONT_SIZE};
`;

const Subtitle = styled.div`
  color: ${DARK_GRAY};
  font-size: ${NORMAL_FONT_SIZE};
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

const UpdatingIndicator = styled.div`
  height: 7rem;
  width: 15rem;
  color: ${DARK_BLUE};
  font-size: ${NORMAL_FONT_SIZE};
  border: 1px solid black;
  background-color: ${LIGHT_GRAY};
  padding: 3rem;
  text-align: center;
  top: 25rem;
  z-index: 1000;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')}
  
  ${CENTER_ELEMENT_MIXIN}
`;

module.exports = {
  Container,
  ListItem,
  ListItemText,
  Subtitle,
  Title,
  UpdatingIndicator,
};
