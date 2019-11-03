/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DraftMenu from '../DraftMenu';
import Requests from '../../Requests/Requests';

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: { uuid: 'abc123' },
  },
  draft: {
    currentDraft: { uuid: 'def234', ownerUserId: 'abc123', status: 'scheduled' },
  },
  socket: {
    socket: {},
  },
};

const props = {
  match: {
    params: {
      id: 'def234',
    },
  },
  displayType: 'table',
};

describe('<DraftMenu />', () => {
  const wrapper = shallow(<DraftMenu {...props} store={mockStore(store)} />);
  test('should render a <DraftMenu /> component', () => {
    const received = wrapper.text();
    const expected = '<DraftMenu />';
    expect(received).toEqual(expected);
  });
  test(
    'should render a <Requests /> component as child if ids from currentUser and currentDraft match',
    () => {
      const requestsLength = wrapper.dive().dive().find(Requests).length;
      expect(requestsLength).toEqual(1);
    },
  );
  test(
    'should not render a <Requests /> component as child if ids from currentUser and currentDraft do not match',
    () => {
      const clonedStore = { ...store };
      clonedStore.draft.currentDraft.ownerUserId = 'ghi789';
      const modifiedWrapper = shallow(<DraftMenu {...props} store={mockStore(clonedStore)} />);
      const requestsLength = modifiedWrapper.dive().dive().find(Requests).length;
      expect(requestsLength).toEqual(0);
    },
  );
});
