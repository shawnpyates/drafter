/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import LoggedInView from '../loggedInView';

describe('<LoggedInView />', () => {
  test('Renders a styled div component', () => {
    const wrapper = shallow(<LoggedInView />);
    const received = wrapper.text();
    const expected = '<styled.div />';
    expect(received).toEqual(expected);
  });
});
