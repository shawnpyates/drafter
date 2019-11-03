/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';

import LoggedInView from '../LoggedInView';

const mockSocket = {
  on: jest.fn(),
};

describe('<LoggedInView />', () => {
  test('Renders a styled div component', () => {
    const wrapper = shallow(<LoggedInView socket={mockSocket} />);
    const received = wrapper.text();
    const expected = '<Switch />';
    expect(received).toEqual(expected);
  });
});
