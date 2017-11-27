import React, { Component } from 'react';
import '../../styles/App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Register from './Register.js';
import Welcome from './Welcome.js'
import { fetchDrafts, fetchCurrentUser } from '../actions';


@connect((store) => {
  return {
    drafts: store.draft.drafts,
    currentUser: store.user.currentUser,
    fetchCurrentUserError: store.user.fetchCurrentUserError
  };
})


class App extends Component {
  
  componentWillMount() {
    if (!this.props.currentUser && localStorage.getItem("drafterUserToken")) {
      this.props.dispatch(fetchCurrentUser())
    }
  }

  handleClick = ev => {
    console.log("PROPS: ", this.props)
  }

  render() {
    let componentToRender 
    // = this.props.currentUser ? <Welcome currentUser={this.props.currentUser} /> : 
    //                                                    <Register/>
    if (!localStorage.getItem("drafterUserToken") || this.props.fetchCurrentUserError) {
      componentToRender = <Register />
    } else if (this.props.currentUser) {
      componentToRender = <Welcome currentUser={this.props.currentUser} />
    } else {
      componentToRender = <div></div>
    }
    const header =
      <header className='siteHeader'>
        <h2>drafter</h2>
        <span className='navbarOptions'>
          <a onClick={this.handleClick}>Sign In</a>
          <a onClick={this.handleClick}>Sign Up</a>
        </span>
      </header>
    return (
      <div className="App">
        {header}
        {componentToRender}
      </div>
    )
    // if (this.props.drafts && this.props.drafts.length) {
      // return (
      //   <div className="App">
      //     <h1 style={{color: "purple"}}>Drafts</h1>
      //     {this.props.drafts.map(draft =>
      //       <div key={draft.id}>{draft.name}</div>
      //     )}
      //   </div>
    //   );
    // } else {
    //   return(<div style={{textAlign: "center", marginTop: 40}}>Loading...</div>)
    // }
  }
}


export default App;
