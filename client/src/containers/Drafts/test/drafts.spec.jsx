/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Drafts from '../drafts';
import Table from '../../../components/Table/table';

const mockStore = configureStore([thunk]);

const store = {
  draft: {
    drafts: [{ foo: 'bar' }],
  },
};

const getWrapper = storeObj => shallow(<Drafts store={mockStore(storeObj)} />);

describe('<Drafts />', () => {
  test('Render a <Drafts /> component', () => {
    const received = getWrapper(store).text();
    const expected = '<Drafts />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if drafts exist', () => {
    const deepWrapper = getWrapper(store).dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(1);
  });
  test('Does not render table as child if no drafts exist', () => {
    const modifiedStore = { draft: { drafts: null } };
    const deepWrapper = getWrapper(modifiedStore).dive();
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
});
