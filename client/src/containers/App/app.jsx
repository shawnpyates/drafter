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
const Loading = styled.div``;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isTokenMissing: false,
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
