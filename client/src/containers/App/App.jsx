import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoggedInView, LoggedOutView } from '..';
import { Header, LoadingIndicator } from '../../components';
import { fetchCurrentUser, removeCurrentUserFromState } from '../../actions';

import { AppContainer } from './styledComponents';

const { localStorage } = window;

const mapStateToProps = (state) => {
  const { currentUser, fetching: isFetchingUser  } = state.user;
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

class App extends Component {
  componentDidMount() {
    const userToken = localStorage.getItem('drafterUserToken');
    if (!this.props.currentUser && userToken) {
      this.props.fetchCurrentUser();
    } 
  }
  

  render() {
    const {
      currentUser,
      isFetchingUser,
      removeCurrentUserFromState: removeCurrentUserFromStatePropFn,
      socket,
    } = this.props;
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
}

App.defaultProps = {
  currentUser: null,
  errorOnFetchCurrentUser: null,
};

App.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  fetchCurrentUser: PropTypes.func.isRequired,
  errorOnFetchCurrentUser: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
