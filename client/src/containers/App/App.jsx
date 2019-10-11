import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoggedInView, LoggedOutView } from '..';
import { Header } from '../../components';
import { fetchCurrentUser } from '../../actions';

import { AppContainer, Loading } from './styledComponents';

const { localStorage } = window;

const mapStateToProps = (state) => {
  const { currentUser, errorOnFetchCurrentUser } = state.user;
  const { socket } = state.socket;
  return { currentUser, errorOnFetchCurrentUser, socket };
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isTokenMissing: false,
      isUserFetchComplete: false,
    };
  }

  componentDidMount() {
    const userToken = localStorage.getItem('drafterUserToken');
    const { isTokenMissing } = this.state;
    if (!this.props.currentUser && userToken) {
      this.setIsTokenMissing(false);
      this.props.fetchCurrentUser();
    } else if (!isTokenMissing && !userToken) {
      this.setIsTokenMissing(true);
    }
  }

  setIsTokenMissing = (isTokenMissing) => {
    this.setState({ isTokenMissing });
  }

  render() {
    const { currentUser, errorOnFetchCurrentUser, socket } = this.props;
    return (
      <Router>
        <AppContainer>
          <Header currentUser={currentUser} />
          {(currentUser && socket) &&
            <LoggedInView socket={socket} />
          }
          {(!currentUser && (this.state.isTokenMissing || errorOnFetchCurrentUser)) &&
            <LoggedOutView />
          }
          {(!currentUser && !this.state.isTokenMissing) &&
            <Loading className="loading">Loading...</Loading>
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
