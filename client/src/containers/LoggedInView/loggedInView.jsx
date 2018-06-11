import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainMenu from '../MainMenu/mainMenu.jsx';
import CreateDraft from '../CreateDraft/createDraft.jsx';

const LoggedInView = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainMenu} />
      <Route path="/createDrafts" component={CreateDraft} />
    </div>
  </Router>
);

export default LoggedInView;
