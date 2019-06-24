/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../app';

const mockStore = configureStore([]);

const store = {
  user: {
    currentUser: {},
  },
};

describe('<App />', () => {
  test('should render an <App /> component', () => {
    const received = shallow(<App store={mockStore(store)} />).text();
    const expected = '<App />';
    expect(received).toEqual(expected);
  });
});
