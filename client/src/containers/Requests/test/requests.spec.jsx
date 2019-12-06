/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Requests from '../Requests';
import { Table } from '../../../components';

const mockStore = configureStore([thunk]);

const store = {
  request: {
    destroyed: false,
  },
  team: {
    created: false,
  },
};

const defaultProps = {
  requests: [
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
  fetchBy: 'draft',
};

const getWrapper = props => shallow(<Requests {...props} store={mockStore(store)} />);

describe('<Requests />', () => {
  test('Renders table as child if drafts exist', () => {
    const deepWrapper = getWrapper(defaultProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(1);
  });
  test('Does not render table as child if no drafts exist', () => {
    const modifiedProps = { ...defaultProps, requests: null };
    const deepWrapper = getWrapper(modifiedProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
});
