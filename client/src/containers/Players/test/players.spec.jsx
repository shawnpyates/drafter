/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Players from '../players';
import Table from '../../../components/Table/table';

const mockStore = configureStore([thunk]);

const store = {
  player: {
    players: [{ foo: 'bar' }],
  },
};

const getWrapper = storeObj => shallow(<Players store={mockStore(storeObj)} />);

describe('<Players />', () => {
  test('Render a <Players /> component', () => {
    const received = getWrapper(store).text();
    const expected = '<Players />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if Players exist', () => {
    const deepWrapper = getWrapper(store).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(1);
  });
  test('Does not render table as child if no Players exist', () => {
    const modifiedStore = { player: { players: null } };
    const deepWrapper = getWrapper(modifiedStore).dive().dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
});
