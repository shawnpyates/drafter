/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Login from '../Login';
import { Form } from '../../../components';

const mockStore = configureStore();

const store = {
  user: {
    errorOnAuthenticateUser: null,
  },
};

describe('<Login />', () => {
  const wrapper = shallow(<Login store={mockStore(store)} />);
  test('should render a <Login /> component', () => {
    const received = wrapper.text();
    const expected = '<Login />';
    expect(received).toEqual(expected);
  });
  test('should render a <Form /> component as child', () => {
    const formLength = wrapper.dive().dive().find(Form).length;
    expect(formLength).toEqual(1);
  });
});
