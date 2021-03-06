import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { header as headerTexts } from '../../texts.json';
import { logoutUser } from '../../actions';

import {
  Container,
  NavBar,
  NavBarItem,
  NavBarLogOut,
  Title,
  TitleBox,
} from './styledComponents';

const MAX_EMAIL_DISPLAY = 30;

const { title, logOut, notLoggedIn } = headerTexts;

function Header({
  currentUser,
  removeCurrentUserFromState,
  isFetchingUser,
}) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
    removeCurrentUserFromState();
  };

  const trimEmail = email => (
    `${email.slice(0, MAX_EMAIL_DISPLAY)}...`
  );

  const userEmail = currentUser && currentUser.email;

  return (
    <Container>
      <TitleBox>
        <Link to="/">
          <Title>{title}</Title>
        </Link>
      </TitleBox>
      {currentUser
      && (
        <NavBar>
          <NavBarItem>
            {userEmail.length > MAX_EMAIL_DISPLAY ? trimEmail(userEmail) : userEmail}
          </NavBarItem>
          <Link to="/">
            <NavBarLogOut onClick={handleLogOut}>{logOut}</NavBarLogOut>
          </Link>
        </NavBar>
      )}
      {(!currentUser && !isFetchingUser)
      && (
        <NavBar>
          <NavBarItem>{notLoggedIn}</NavBarItem>
        </NavBar>
      )}
    </Container>
  );
}

Header.defaultProps = {
  currentUser: null,
};

Header.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  isFetchingUser: PropTypes.bool.isRequired,
  removeCurrentUserFromState: PropTypes.func.isRequired,
};

export default Header;
