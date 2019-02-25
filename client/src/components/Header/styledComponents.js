import styled from 'styled-components';

const Container = styled.header`
  background-color: #11133F;
  height: 14rem;
  font-size: 1.6rem;
  position: relative;

  @media only screen and (min-width: 600px) {
    height: 10rem;
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
  font-family: 'La Belle Aurore', sans-serif;
  font-size: 3.5rem;
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
  color: #7EC0EE;
`;

const NavBarLogOut = styled(NavBarItem)`
  cursor: pointer;
  color: #FFF;
`;

module.exports = {
  Container,
  NavBar,
  NavBarItem,
  NavBarLogOut,
  Title,
  TitleBox,
};

