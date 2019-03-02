import styled from 'styled-components';

import {
  DARK_BLUE,
  DEFAULT_FONT,
  NORMAL_FONT_SIZE,
  SKY_BLUE,
  WHITE,
} from '../../../globalStyles';

const Container = styled.header`
  background-color: ${DARK_BLUE};
  height: 14rem;
  font-size: ${NORMAL_FONT_SIZE};
  font-family: ${DEFAULT_FONT};
  position: relative;
  width: 100%;

  @media only screen and (min-width: 550px) {
    height: 80px;
  }
`;

const Title = styled.h2`
  display: inline-block;
  font-family: 'La Belle Aurore', sans-serif;
  font-size: 3.5rem;
  color: ${WHITE};
`;

const NavBar = styled.div`
  z-index: 10;
  margin-top: 8px;
  text-align: center;

  @media only screen and (min-width: 550px) {
    float: right;
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
  Title,
  NavBar,
  NavBarItem,
  NavBarLogOut,
};

