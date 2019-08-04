/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Requests from '../requests';
import Table from '../../../components/Table/table';

const mockStore = configureStore([thunk]);

const store = {
  request: {
    requestsForDraft: [
      {
        uuid: 'abc123',
        teamName: 'Wings',
        User: {
          firstName: 'Ed',
          lastName: 'Eden',
          email: 'ee@foo.bar',
        },
      },
    ],
  },
};

const props = { fetchBy: 'draft' };

const getWrapper = storeObj => shallow(<Requests {...props} store={mockStore(storeObj)} />);

describe('<Requests />', () => {
  test('Render a <Requests /> component', () => {
    const received = getWrapper(store).text();
    const expected = '<Requests />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if drafts exist', () => {
    const deepWrapper = getWrapper(store).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(1);
  });
  test('Does not render table as child if no drafts exist', () => {
    const modifiedStore = { request: { requestsForDraft: null } };
    const deepWrapper = getWrapper(modifiedStore).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
});
