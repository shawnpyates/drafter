/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import LoggedInView from '../loggedInView';

describe('<LoggedInView />', () => {
  test('Renders a react-router Switch component', () => {
    const wrapper = shallow(<LoggedInView />);
    const received = wrapper.text();
    const expected = '<Switch />';
    expect(received).toEqual(expected);
  });
});
