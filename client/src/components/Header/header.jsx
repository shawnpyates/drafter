import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { header as headerTexts } from '../../../texts.json';

import {
  Container,
  NavBar,
  NavBarItem,
  NavBarLogOut,
  Title,
  TitleBox,
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
      <TitleBox>
        <Link to="/">
          <Title>{title}</Title>
        </Link>
      </TitleBox>
      {currentUser &&
        <NavBar>
          <NavBarItem>{currentUser.email}</NavBarItem>
          <Link to="/">
            <NavBarLogOut onClick={handleLogOut}>{logOut}</NavBarLogOut>
          </Link>
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
