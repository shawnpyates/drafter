/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PlayerMenu from '../PlayerMenu';

import Drafts from '../../Drafts/drafts';
import Players from '../../Players/players';

const mockStore = configureStore([thunk]);

const store = {
  player: {
    currentPlayer: {
      name: 'Foo Bar',
      email: 'foo@bar.com',
      position: 'Defence',
      Draft: {
        name: 'Foo Draft',
      },
      Team: null,
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

describe('<PlayerMenu />', () => {
  const wrapper = shallow(<PlayerMenu {...props} store={mockStore(store)} />);
  test('should render a <PlayerMenu /> component', () => {
    const received = wrapper.text();
    const expected = '<PlayerMenu />';
    expect(received).toEqual(expected);
  });
  // test('should render a <Drafts /> component as child', () => {
  //   const draftsLength = wrapper.dive().find(Drafts).length;
  //   expect(draftsLength).toEqual(1);
  // });
  // test('should render a <Players /> component as child', () => {
  //   const playersLength = wrapper.dive().find(Players).length;
  //   expect(playersLength).toEqual(1);
  // });
});
