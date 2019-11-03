/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Players from '../Players';
// import { SelectionList, Table } from '../../../components';
import SelectionList from '../../../components/SelectionList/SelectionList';
import Table from '../../../components/Table/Table';

const mockStore = configureStore([thunk]);

const defaultProps = {
  displayType: 'table',
  players: [{ uuid: 'abc123' }],
  draft: { uuid: 'def456' },
};

const store = {
  draft: {
    shouldDraftViewBlur: false,
  },
};

const getWrapper = (storeObj, props) => (
  shallow(<Players {...props} store={mockStore(storeObj)} />)
);

describe('<Players />', () => {
  test('Render a <Players /> component', () => {
    const received = getWrapper(store, defaultProps).text();
    const expected = '<Players />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if Players exist and displayType is table', () => {
    const deepWrapper = getWrapper(store, defaultProps);
    const tableLength = deepWrapper.find(Table).length.dive().dive();
    const selectionListLength = deepWrapper.find(SelectionList).length;
    expect(tableLength).toEqual(1);
    expect(selectionListLength).toEqual(0);
  });
  test('Does not render table as child if no Players exist', () => {
    const modifiedStore = { player: { players: null } };
    const deepWrapper = getWrapper(modifiedStore, defaultProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
  test.only('Renders selectionList as child if Players exist and displayType is selectionList', () => {
    const modifiedProps = { ...defaultProps, displayType: 'selectionList' };
    const deepWrapper = getWrapper(store, modifiedProps).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    const selectionListLength = deepWrapper.find(SelectionList).length;
    expect(tableLength).toEqual(0);
    expect(selectionListLength).toEqual(1);
  });
});
