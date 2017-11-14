import React, { Component } from 'react';
import '../../styles/App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Register from './Register.js';
import { fetchDrafts } from '../actions/draftActions'


@connect((store) => {
  console.log("STORE: ", store)
  return {
    drafts: store.draft.drafts
  };
})


class App extends Component {
  
  componentDidMount() {
    // axios.get('/api/drafts')
    //   .then(res => {
    //     this.setState({drafts: res.data})
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
    this.props.dispatch(fetchDrafts())
  }

  handleClick = ev => {
    console.log("PROPS: ", this.props)
    console.log("STATE: ", this.state)
    console.log(this.props.drafts)
  }

  render() {
    console.log(this.props)
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
        <Register />
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
