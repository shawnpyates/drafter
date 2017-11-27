import React, { Component } from 'react';




class Welcome extends Component {

  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
        Hi, {this.props.currentUser.firstName}!
      </div>
    )
  }
}

export default Welcome;