import React from 'react';
import PropTypes from 'prop-types';
import { header as headerTexts } from '../../../texts.json';

import {
  Container,
  Title,
  NavBar,
  NavBarItem,
  NavBarLogOut,
} from './styledComponents';

const { title, logOut, notLoggedIn } = headerTexts;
const { localStorage, location } = window;

const Header = ({ currentUser }) => {
  const handleLogOut = () => {
    localStorage.removeItem('drafterUserToken');
    location.reload();
  };

  return (
    <Container>
      <Title>{title}</Title>
      {currentUser &&
        <NavBar>
          <NavBarItem>{currentUser.email}</NavBarItem>
          <NavBarLogOut onClick={handleLogOut}>{logOut}</NavBarLogOut>
        </NavBar>
      }
      {!currentUser &&
        <NavBar>
          <NavBarItem>{notLoggedIn}</NavBarItem>
        </NavBar>
      }
    </Container>
  );
};

Header.defaultProps = {
  currentUser: null,
};

Header.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

export default Header;
