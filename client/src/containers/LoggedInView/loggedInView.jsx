import React from 'react';
import { Route } from 'react-router-dom';
import MainMenu from '../MainMenu/mainMenu.jsx';
import CreateDraft from '../CreateDraft/createDraft.jsx';

const LoggedInView = () => (
  <div>
    <Route exact path="/" component={MainMenu} />
    <Route path="/createDrafts" component={CreateDraft} />
  </div>
);

export default LoggedInView;
