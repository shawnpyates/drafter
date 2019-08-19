/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TeamMenu from '../TeamMenu';

import Drafts from '../../Drafts/Drafts';
import Players from '../../Players/Players';

const mockStore = configureStore([thunk]);

const store = {
  team: {
    currentTeam: {
      uuid: 'abc123',
      name: 'Foo',
      User: {
        firstName: 'Al Ali',
      },
    },
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
    const draftsLength = wrapper.dive().dive().find(Drafts).length;
    expect(draftsLength).toEqual(1);
  });
  test('should render a <Players /> component as child', () => {
    const playersLength = wrapper.dive().dive().find(Players).length;
    expect(playersLength).toEqual(1);
  });
});
