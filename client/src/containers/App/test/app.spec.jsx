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

describe('<App />', () => {
  const wrapper = shallow(<App store={mockStore(store)} />);
  test('should render an <App /> component', () => {
    const received = wrapper.text();
    const expected = '<App />';
    expect(received).toEqual(expected);
  });
  test('should render a <Header /> component as child', () => {
    const headerLength = wrapper.dive().find(Header).length;
    expect(headerLength).toEqual(1);
  });
  test('if user exists render LoggedInView as child but not LoggedOutView', () => {
    const loggedInViewLength = wrapper.dive().find(LoggedInView).length;
    const loggedOutViewLength = wrapper.dive().find(LoggedOutView).length;
    expect(loggedInViewLength).toEqual(1);
    expect(loggedOutViewLength).toEqual(0);
  });
  test('if user does not exist render LoggedOutView as child but not LoggedInView', () => {
    const modifiedStore = { user: { currentUser: null } };
    const modifiedWrapper = shallow(<App store={mockStore(modifiedStore)} />);
    const loggedInViewLength = modifiedWrapper.dive().find(LoggedInView).length;
    const loggedOutViewLength = modifiedWrapper.dive().find(LoggedOutView).length;
    expect(loggedInViewLength).toEqual(0);
    expect(loggedOutViewLength).toEqual(1);
  });
  test('should map currentUser from state to props', () => {
    const received = wrapper.prop('currentUser');
    const expected = store.user.currentUser;
    expect(received).toEqual(expected);
  });
});
