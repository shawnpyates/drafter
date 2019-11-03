/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import LoggedOutView from '../LoggedOutView';

import Login from '../../Login/Login';
import Register from '../../Register/Register';

const wrapper = shallow(<LoggedOutView />);

describe('<LoggedOutView />', () => {
  test('should render a styled div component', () => {
    const received = wrapper.text();
    const expected = '<styled.div />';
    expect(received).toEqual(expected);
  });
  test('should render Login component as child by default', () => {
    const loginLength = wrapper.find(Login).length;
    const registerLength = wrapper.find(Register).length;
    expect(loginLength).toEqual(1);
    expect(registerLength).toEqual(0);
  });
});
