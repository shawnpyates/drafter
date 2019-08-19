/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import LogIn from '../Login';
import { Form } from '../../../components';

const mockStore = configureStore();

const store = {
  user: {
    errorOnAuthenticateUser: null,
  },
};

describe('<LogIn />', () => {
  const wrapper = shallow(<LogIn store={mockStore(store)} />);
  test('should render a <LogIn /> component', () => {
    const received = wrapper.text();
    const expected = '<LogIn />';
    expect(received).toEqual(expected);
  });
  test('should render a <Form /> component as child', () => {
    const formLength = wrapper.dive().dive().find(Form).length;
    expect(formLength).toEqual(1);
  });
});
