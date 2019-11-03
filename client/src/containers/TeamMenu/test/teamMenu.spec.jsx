/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TeamMenu from '../TeamMenu';
import Players from '../../Players/Players';

import { LoadingIndicator } from '../../../components';

const mockStore = configureStore([thunk]);

const defaultStore = {
  team: {
    currentTeam: {
      uuid: 'abc123',
      name: 'Foo',
      User: {
        uuid: 'def456',
        firstName: 'Al Ali',
      },
      Draft: {
        uuid: 'ghi789',
        ownerUserId: 'def456',
      },
    },
    fetching: false,
  },
  user: {
    currentUser: {
      uuid: 'def456',
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
  const wrapper = store => shallow(<TeamMenu {...props} store={mockStore(store)} />);
  test('should render a <TeamMenu /> component', () => {
    const received = wrapper(defaultStore).text();
    const expected = '<TeamMenu />';
    expect(received).toEqual(expected);
  });
  test('should render a <Players /> component as child', () => {
    const playersLength = wrapper(defaultStore).dive().dive().find(Players).length;
    expect(playersLength).toEqual(1);
  });
  test('should render LoadingIndicator if fetching team', () => {
    const modifiedTeam = { currentTeam: null, fetching: true };
    const modifiedStore = { ...defaultStore, team: modifiedTeam };
    const loadingIndicatorLength = (
      wrapper(modifiedStore).dive().dive().find(LoadingIndicator).length
    );
    expect(loadingIndicatorLength).toEqual(1);
  });
});
