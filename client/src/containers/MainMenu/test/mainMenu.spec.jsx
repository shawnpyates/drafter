/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import MainMenu from '../mainMenu';

const mockStore = configureStore();

const store = {
  user: {
    currentUser: {
      uuid: 'abc-123',
    },
  },
};

describe('<MainMenu />', () => {
  test('should render a <MainMenu /> component', () => {
    const wrapper = shallow(<MainMenu store={mockStore(store)} />);
    const received = wrapper.text();
    const expected = '<MainMenu />';
    expect(received).toEqual(expected);
  });
});
