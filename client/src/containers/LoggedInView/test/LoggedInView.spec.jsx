/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import LoggedInView from '../LoggedInView';

describe('<LoggedInView />', () => {
  test('Renders a styled div component', () => {
    const wrapper = shallow(<LoggedInView />);
    const received = wrapper.text();
    const expected = '<Switch />';
    expect(received).toEqual(expected);
  });
});
