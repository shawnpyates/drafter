/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Teams from '../Teams';
import { SelectionList, Table } from '../../../components';

const mockStore = configureStore([thunk]);

const defaultProps = {
  displayType: 'table',
};

const store = {
  team: {
    teams: [
      {
        uuid: 'abc123',
        name: 'Foo',
        User: {
          firstName: 'Al',
          lastName: 'Ali',
        },
        Draft: {
          name: 'Bar',
        },
      },
    ],
  },
};

const getWrapper = (storeObj, props) => (
  shallow(<Teams {...props} store={mockStore(storeObj)} />)
);

describe('<Teams />', () => {
  test('Render a <Teams /> component', () => {
    const received = getWrapper(store, defaultProps).text();
    const expected = '<Teams />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if teams exist and displayType is table', () => {
    const deepWrapper = getWrapper(store, defaultProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    const selectionListLength = deepWrapper.find(SelectionList).length;
    expect(tableLength).toEqual(1);
    expect(selectionListLength).toEqual(0);
  });
  test('Does not render table as child if no teams exist', () => {
    const modifiedStore = { ...store, team: { teams: null } };
    const deepWrapper = getWrapper(modifiedStore, defaultProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
  test('Renders selectionList as child if Teams exist and displayType is selectionList', () => {
    const modifiedProps = { displayType: 'selectionList' };
    const deepWrapper = getWrapper(store, modifiedProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    const selectionListLength = deepWrapper.find(SelectionList).length;
    expect(tableLength).toEqual(0);
    expect(selectionListLength).toEqual(1);
  });
});
