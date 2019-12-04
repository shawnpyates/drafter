/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CreateTeam from '../CreateTeam';

import { drafts as draftsTestData } from '../../../../../testData.json';

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: {
      uuid: 'abc123',
      Drafts: draftsTestData,
    },
  },
  request: {
    createdRequest: { uuid: 'def456' },
  },
  team: {
    currentTeam: null,
    fetching: false,
  },
};

const wrapper = shallow((
  <CreateTeam
    store={mockStore(store)}
  />
));

describe('<CreateTeam />', () => {
  describe('CreateTeam component', () => {
    test('should render a <CreateTeam /> component', () => {
      const received = wrapper.text();
      const expected = '<CreateTeam />';
      expect(received).toEqual(expected);
    });
  });
});
