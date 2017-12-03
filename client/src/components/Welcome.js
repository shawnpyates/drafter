import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DisplayData from './DisplayData.js'



class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      componentToRender: "displayData"
    }
  }

  determineComponentToRender = () => {
    switch (this.state.componentToRender) {
      case ("displayData"):
        return(<DisplayData currentUser={this.props.currentUser}/>)
      default:
        return
    }
  }

  
  render() {
    const componentToRender = this.determineComponentToRender()
    return (
      <div className="welcomeContainer">
        <h2>Welcome, {this.props.currentUser.firstName}.</h2>
        {componentToRender}
      </div>
    )
  }
}

export default Welcome;