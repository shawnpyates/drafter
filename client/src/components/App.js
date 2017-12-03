import React, { Component } from 'react';
import '../../styles/App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Landing from './Landing.js';
import Welcome from './Welcome.js'
import { fetchDrafts, fetchCurrentUser } from '../actions';


@connect((store) => {
  return {
    drafts: store.draft.drafts,
    currentUser: store.user.currentUser,
    errorOnFetchCurrentUser: store.user.errorOnFetchCurrentUser
  };
})


class App extends Component {
  
  componentWillMount() {
    if (!this.props.currentUser && localStorage.getItem("drafterUserToken")) {
      this.props.dispatch(fetchCurrentUser())
    }
  }

  handleClick = ev => {
    localStorage.removeItem("drafterUserToken")
    window.location.reload()
  }

  render() {
    let componentToRender 
    let emailDisplay
    let myProfileAnchor
    let logoutAnchor
    if (!localStorage.getItem("drafterUserToken") || this.props.errorOnFetchCurrentUser) {
      componentToRender = <Landing />
      logoutAnchor = <a onClick={this.handleClick}>Not Logged In</a>      
    } else if (this.props.currentUser) {
      componentToRender = <Welcome currentUser={this.props.currentUser} />
      emailDisplay = <p>{this.props.currentUser.email}</p>
      myProfileAnchor = <a onClick={this.handleClick}>My Profile</a>      
      logoutAnchor = <a onClick={this.handleClick}>Log Out</a>
    } else {
      componentToRender = <div></div>
      logoutAnchor = <a></a>
    }
    let navbar = this.props.currentUser ?
                 <span className='navbarOptions'>
                   {logoutAnchor}{myProfileAnchor}{emailDisplay}
                 </span>
                 : 
                 <span className='navbarOptions'>
                   {logoutAnchor}
                 </span>
    const header =
      <header className='siteHeader'>
        <h2>drafter</h2>
        {navbar}
      </header>
    return (
      <div className="App">
        {header}
        {componentToRender}
      </div>
    )
  }
}


export default App;
