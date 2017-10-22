import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    drafts: []
  }
  
    componentDidMount() {
      axios.get('/api/drafts')
        .then(res => {
          this.setState({drafts: res.data})
        })
        .catch(e => {
          console.error(e)
        })
    }
  
    render() {
      if (this.state.drafts.length) {
        return (
          <div className="App">
            <h1 style={{color: "purple"}}>Drafts</h1>
            {this.state.drafts.map(draft =>
              <div key={draft.id}>{draft.name}</div>
            )}
          </div>
        );
      } else {
        return(<div style={{textAlign: "center", marginTop: 40}}>Loading...</div>)
      }
    }
}

export default App;
