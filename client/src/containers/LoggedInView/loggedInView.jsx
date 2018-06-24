import React from 'react';
import { Route } from 'react-router-dom';
import MainMenu from '../MainMenu/mainMenu';
import CreateDraft from '../CreateDraft/createDraft';
import UpdateUser from '../UpdateUser/updateUser';

const LoggedInView = () => (
  <div>
    <Route exact path="/" component={MainMenu} />
    <Route path="/createDrafts" component={CreateDraft} />
    <Route path="/updateUser" component={UpdateUser} />
  </div>
);

export default LoggedInView;
