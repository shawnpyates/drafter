import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import LoggedInView from '../LoggedInView/LoggedInView';
import LoggedOutView from '../LoggedOutView/LoggedOutView';

import { Header, LoadingIndicator } from '../../components';
import { fetchCurrentUser, removeCurrentUserFromState } from '../../actions';

import { AppContainer } from './styledComponents';

const mapStateToProps = (state) => {
  const { currentUser, fetching: isFetchingUser } = state.user;
  const { socket } = state.socket;
  return {
    currentUser,
    isFetchingUser,
    socket,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  removeCurrentUserFromState: () => dispatch(removeCurrentUserFromState()),
});

function App({
  currentUser,
  isFetchingUser,
  socket,
  fetchCurrentUser: fetchCurrentUserPropFn,
  removeCurrentUserFromState: removeCurrentUserFromStatePropFn,
}) {
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUserPropFn();
    }
  }, []);

  return (
    <Router>
      <AppContainer>
        <Header
          currentUser={currentUser}
          isFetchingUser={isFetchingUser}
          removeCurrentUserFromState={removeCurrentUserFromStatePropFn}
        />
        {(currentUser && socket && !isFetchingUser)
        && <LoggedInView socket={socket} />
        }
        {(!currentUser && !isFetchingUser)
        && <LoggedOutView />
        }
        {isFetchingUser
        && <LoadingIndicator />
        }
      </AppContainer>
    </Router>
  );
}

App.defaultProps = {
  currentUser: null,
  socket: null,
};

App.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  fetchCurrentUser: PropTypes.func.isRequired,
  isFetchingUser: PropTypes.bool.isRequired,
  removeCurrentUserFromState: PropTypes.func.isRequired,
  socket: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
