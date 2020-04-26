import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const { MENU_TEXT_MIXIN } = mixins;
const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
  DEFAULT_FONT,
  PRETTY_FONT,
} = styleVars;

const Container = styled.header`
  background-color: ${DARK_BLUE};
  height: 14rem;
  position: relative;
  width: 100%;

  ${MENU_TEXT_MIXIN({ color: WHITE })}

  @media only screen and (min-width: 600px) {
    height: 12rem;
  }
`;

const TitleBox = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -40%);
  min-width: 80%;
  text-align: center;

  @media only screen and (min-width: 600px) {
    top: 50%;
    left: 2rem;
    transform: translate(0, -40%);
    text-align: left;
  }
`;

const Title = styled.h2`
  display: inline-block;
  font-family: ${PRETTY_FONT}, ${DEFAULT_FONT};
  font-size: 5rem;
  color: #FFF;
`;

const NavBar = styled.div`
  position: absolute;
  bottom: 20%;
  right: 50%;
  transform: translate(50%, 50%);
  min-width: 80%;
  text-align: center;

  @media only screen and (min-width: 600px) {
    bottom: 50%;
    right: 2rem;
    transform: translate(0, 50%);
    text-align: right;
  }
`;

const NavBarItem = styled.p`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
  margin: auto 15px;
  color: ${SKY_BLUE};

  @media only screen and (min-width: 550px) {
    text-align: right;
  }
`;

const NavBarLogOut = styled(NavBarItem)`
  cursor: pointer;
  color: ${WHITE};
`;

module.exports = {
  Container,
  NavBar,
  NavBarItem,
  NavBarLogOut,
  Title,
  TitleBox,
};
