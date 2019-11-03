/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import Teams from '../Teams';
import { SelectionList, Table } from '../../../components';

const defaultProps = {
  displayType: 'table',
  teams: [{ uuid: 'abc123' }],
};

describe('<Teams />', () => {
  test('Renders table as child if teams exist and displayType is table', () => {
    const deepWrapper = shallow(<Teams {...defaultProps} />);
    const tableLength = deepWrapper.find(Table).length;
    const selectionListLength = deepWrapper.find(SelectionList).length;
    expect(tableLength).toEqual(1);
    expect(selectionListLength).toEqual(0);
  });
  test('Does not render table as child if no teams exist', () => {
    const modifiedProps = { ...defaultProps, teams: null };
    const deepWrapper = shallow(<Teams {...modifiedProps} />);
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
  test('Renders selectionList as child if Teams exist and displayType is selectionList', () => {
    const modifiedProps = { ...defaultProps, displayType: 'selectionList' };
    const deepWrapper = shallow(<Teams {...modifiedProps} />);
    const tableLength = deepWrapper.find(Table).length;
    const selectionListLength = deepWrapper.find(SelectionList).length;
    expect(tableLength).toEqual(0);
    expect(selectionListLength).toEqual(1);
  });
});
