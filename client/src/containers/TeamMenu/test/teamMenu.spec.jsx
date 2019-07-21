/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TeamMenu from '../teamMenu';

import Drafts from '../../Drafts/drafts';
import Players from '../../Players/players';

const mockStore = configureStore([thunk]);

const store = {
  team: {
    users: [],
    teams: [{ uuid: 'abc123', name: 'Foo' }],
    drafts: [],
  },
};

const props = {
  match: {
    params: {
      id: 'abc123',
    },
  },
};

describe('<TeamMenu />', () => {
  const wrapper = shallow(<TeamMenu {...props} store={mockStore(store)} />);
  test('should render a <TeamMenu /> component', () => {
    const received = wrapper.text();
    const expected = '<TeamMenu />';
    expect(received).toEqual(expected);
  });
  test('should render a <Drafts /> component as child', () => {
    const draftsLength = wrapper.dive().find(Drafts).length;
    expect(draftsLength).toEqual(1);
  });
  test('should render a <Players /> component as child', () => {
    const playersLength = wrapper.dive().find(Players).length;
    expect(playersLength).toEqual(1);
  });
});
