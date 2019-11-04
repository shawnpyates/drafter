/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../App';

import LoggedInView from '../../LoggedInView/LoggedInView';
import LoggedOutView from '../../LoggedOutView/LoggedOutView';

import { Header, LoadingIndicator } from '../../../components';

const mockStore = configureStore();

const store = {
  user: {
    currentUser: {
      uuid: 'abc-123',
    },
    fetching: false,
  },
  socket: {
    socket: {},
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
    const headerLength = getWrapper(store).dive().dive().find(Header).length;
    expect(headerLength).toEqual(1);
  });
  test('if user and socket exist render LoggedInView as child', () => {
    const deepWrapper = getWrapper(store).dive().dive();
    const loggedInViewLength = deepWrapper.find(LoggedInView).length;
    const loggedOutViewLength = deepWrapper.find(LoggedOutView).length;
    const loadingViewLength = deepWrapper.find(LoadingIndicator).length;
    expect(loggedInViewLength).toEqual(1);
    expect(loggedOutViewLength).toEqual(0);
    expect(loadingViewLength).toEqual(0);
  });
  test('if user does not exist and not fetching, render LoggedOutView as child', () => {
    const modifiedUser = { ...store.user, currentUser: null };
    const modifiedStore = { ...store, user: modifiedUser };
    const deepWrapper = getWrapper(modifiedStore).dive().dive();
    const loggedInViewLength = deepWrapper.find(LoggedInView).length;
    const loggedOutViewLength = deepWrapper.find(LoggedOutView).length;
    const loadingViewLength = deepWrapper.find(LoadingIndicator).length;
    expect(loggedInViewLength).toEqual(0);
    expect(loggedOutViewLength).toEqual(1);
    expect(loadingViewLength).toEqual(0);
  });
  test('if is fetching user, render LoadingIndicator as child', () => {
    const modifiedUser = { fetching: true, currentUser: null };
    const modifiedStore = { ...store, user: modifiedUser };
    const deepWrapper = getWrapper(modifiedStore).dive().dive();
    const loggedInViewLength = deepWrapper.find(LoggedInView).length;
    const loggedOutViewLength = deepWrapper.find(LoggedOutView).length;
    const loadingViewLength = deepWrapper.find(LoadingIndicator).length;
    expect(loggedInViewLength).toEqual(0);
    expect(loggedOutViewLength).toEqual(0);
    expect(loadingViewLength).toEqual(1);
  });
  test('should map currentUser from state to props', () => {
    const received = getWrapper(store).prop('children').props.currentUser;
    const expected = store.user.currentUser;
    expect(received).toEqual(expected);
  });
});
