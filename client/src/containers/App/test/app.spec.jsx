/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../app';
import LoggedInView from '../../LoggedInView/loggedInView';
import LoggedOutView from '../../LoggedOutView/loggedOutView';
import Header from '../../../components/Header/header';

const mockStore = configureStore();

const store = {
  user: {
    currentUser: {
      uuid: 'abc-123',
    },
  },
};

const getWrapper = storeObj => shallow(<App store={mockStore(storeObj)} />);

describe('<App />', () => {
  test('should render an <App /> component', () => {
    const received = getWrapper(store).text();
    const expected = '<App />';
    expect(received).toEqual(expected);
  });
  test('should render a <Header /> component as child', () => {
    const headerLength = getWrapper(store).dive().find(Header).length;
    expect(headerLength).toEqual(1);
  });
  test('if user exists render LoggedInView as child but not LoggedOutView', () => {
    const deepWrapper = getWrapper(store).dive();
    const loggedInViewLength = deepWrapper.find(LoggedInView).length;
    const loggedOutViewLength = deepWrapper.find(LoggedOutView).length;
    const loadingDivLength = deepWrapper.find('.loading').length;
    expect(loggedInViewLength).toEqual(1);
    expect(loggedOutViewLength).toEqual(0);
    expect(loadingDivLength).toEqual(0);
  });
  test('if user does not exist and no token render LoggedOutView as child', () => {
    const modifiedStore = { user: { currentUser: null } };
    const deepWrapper = getWrapper(modifiedStore).dive();
    deepWrapper.setState({ isTokenMissing: true });
    const loggedInViewLength = deepWrapper.find(LoggedInView).length;
    const loggedOutViewLength = deepWrapper.find(LoggedOutView).length;
    const loadingDivLength = deepWrapper.find('.loading').length;
    expect(loggedInViewLength).toEqual(0);
    expect(loggedOutViewLength).toEqual(1);
    expect(loadingDivLength).toEqual(0);
  });
  test('if user does not exist and token exists render LoggedOutView as child', () => {
    const modifiedStore = { user: { currentUser: null } };
    const deepWrapper = getWrapper(modifiedStore).dive();
    deepWrapper.setState({ isTokenMissing: false });
    const loggedInViewLength = deepWrapper.find(LoggedInView).length;
    const loggedOutViewLength = deepWrapper.find(LoggedOutView).length;
    const loadingDivLength = deepWrapper.find('.loading').length;
    expect(loggedInViewLength).toEqual(0);
    expect(loggedOutViewLength).toEqual(0);
    expect(loadingDivLength).toEqual(1);
  });
  test('should map currentUser from state to props', () => {
    const received = getWrapper(store).prop('currentUser');
    const expected = store.user.currentUser;
    expect(received).toEqual(expected);
  });
});
