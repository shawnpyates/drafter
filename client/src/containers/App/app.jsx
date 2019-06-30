import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header/header';
import LoggedInView from '../LoggedInView/loggedInView';
import LoggedOutView from '../LoggedOutView/loggedOutView';
import { fetchCurrentUser } from '../../actions';

const { localStorage } = window;

const mapStateToProps = (state) => {
  const { currentUser, errorOnFetchCurrentUser } = state.user;
  return { currentUser, errorOnFetchCurrentUser };
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});

const AppContainer = styled.div``;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isTokenMissing: false,
    };
  }

  componentWillMount() {
    const userToken = localStorage.getItem('drafterUserToken');
    if (!this.props.currentUser && userToken) {
      this.setState({ isTokenMissing: false });
      this.props.fetchCurrentUser();
    } else if (!userToken) {
      this.setState({ isTokenMissing: true });
    }
  }

  render() {
    const { currentUser, errorOnFetchCurrentUser } = this.props;
    return (
      <Router>
        <AppContainer>
          <Header currentUser={currentUser} />
          {currentUser &&
            <LoggedInView />
          }
          {(!currentUser && (this.state.isTokenMissing || errorOnFetchCurrentUser)) &&
            <LoggedOutView />
          }
          {(!currentUser && !this.state.isTokenMissing) &&
            <div>Loading...</div>
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
