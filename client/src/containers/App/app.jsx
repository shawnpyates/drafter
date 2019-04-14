import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header/header.jsx';
import LoggedInView from '../LoggedInView/loggedInView.jsx';
import LoggedOutView from '../LoggedOutView/loggedOutView.jsx';
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
    if (!this.props.currentUser && localStorage.getItem('drafterUserToken')) {
      this.setState({ isTokenMissing: false });
      this.props.fetchCurrentUser();
    } else {
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
          {(this.state.isTokenMissing || errorOnFetchCurrentUser) &&
            <LoggedOutView />
          }
          {!currentUser && !this.state.isTokenMissing &&
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
