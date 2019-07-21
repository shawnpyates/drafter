/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Teams from '../teams';
import Table from '../../../components/Table/table';

const mockStore = configureStore([thunk]);

const store = {
  team: {
    teams: [{ foo: 'bar' }],
  },
  draft: {
    drafts: [],
  },
};

const getWrapper = storeObj => shallow(<Teams store={mockStore(storeObj)} />);

describe('<Teams />', () => {
  test('Render a <Teams /> component', () => {
    const received = getWrapper(store).text();
    const expected = '<Teams />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if teams exist', () => {
    const deepWrapper = getWrapper(store).dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(1);
  });
  test('Does not render table as child if no teams exist', () => {
    const modifiedStore = { ...store, team: { teams: null } };
    const deepWrapper = getWrapper(modifiedStore).dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
});
