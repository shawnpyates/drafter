import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from './Landing';
import Welcome from './Welcome';
import '../../styles/App.css';
import { fetchCurrentUser } from '../actions';

const { localStorage, location } = window;

const mapStateToProps = (state) => {
  const { currentUser, errorOnFetchCurrentUser } = state.user;
  return { currentUser, errorOnFetchCurrentUser };
};

const handleClick = () => {
  localStorage.removeItem('drafterUserToken');
  location.reload();
};

class App extends Component {
  componentWillMount() {
    if (!this.props.currentUser && localStorage.getItem('drafterUserToken')) {
      this.props.dispatch(fetchCurrentUser());
    }
  }

  render() {
    let componentToRender;
    let emailDisplay;
    let myProfileAnchor;
    let logoutAnchor;
    if (!localStorage.getItem('drafterUserToken') || this.props.errorOnFetchCurrentUser) {
      componentToRender = <Landing />;
      logoutAnchor = <a onClick={handleClick}>Not Logged In</a>;
    } else if (this.props.currentUser) {
      componentToRender = <Welcome currentUser={this.props.currentUser} />;
      emailDisplay = <p>{this.props.currentUser.email}</p>;
      myProfileAnchor = <a onClick={handleClick}>My Profile</a>;
      logoutAnchor = <a onClick={handleClick}>Log Out</a>;
    } else {
      componentToRender = <div />;
      logoutAnchor = <a />;
    }
    const navbar = this.props.currentUser ?
      (<span className="navbarOptions">
        {logoutAnchor}{myProfileAnchor}{emailDisplay}
       </span>)
      :
      (<span className="navbarOptions">
        {logoutAnchor}
       </span>);
    const header =
      (<header className="siteHeader">
        <h2>drafter</h2>
        {navbar}
       </header>);
    return (
      <div className="App">
        {header}
        {componentToRender}
      </div>
    );
  }
}

App.defaultProps = {
  currentUser: null,
  errorOnFetchCurrentUser: null,
};

App.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func.isRequired,
  errorOnFetchCurrentUser: PropTypes.string,
};


export default connect(mapStateToProps)(App);
