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
  margin: 4rem auto;
  border-radius: 4px;
  height: 65rem;
  display: inline-block;
  position: absolute;
  width: 50%;

  ${MENU_TEXT_MIXIN({ color: DARK_BLUE })}
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ButtonContainer = styled.div`
  height: 5rem;
  width: 15rem;
  display: inline;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const TabListItem = styled.button`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 30%;
  transform: translateX(${props => (props.isLeft ? '-' : '')}50%);
  padding: 12px;
  min-width: 10rem;
  text-decoration: none;
  color: #1AB188;
  transition: 0.5s ease;
  background: ${DARK_GRAY};
  color: ${WHITE};
  font-size: ${LARGE_FONT_SIZE};
  text-align: center;
  cursor: pointer;
  &:hover {
    background: ${SKY_BLUE};
    color: ${WHITE};
  }

  @media only screen and (max-width: 600px) {
    display: block;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TabListContainer = styled.div`
  min-height: 10%;
`;

module.exports = {
  ButtonContainer,
  FormContainer,
  TabList,
  TabListItem,
  TabListContainer,
};
