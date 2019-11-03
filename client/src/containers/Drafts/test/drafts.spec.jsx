/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import Drafts from '../Drafts';
import { Table } from '../../../components';

const props = {
  drafts: [
    {
      uuid: 'abc123',
      name: 'Foo',
      User: {
        firstName: 'Al',
        lastName: 'Ali',
      },
    },
  ],
};

describe('<Drafts />', () => {
  test('Render a <Drafts /> component', () => {
    const received = shallow(<Drafts {...props} />).text();
    const expected = '<Drafts />';
    expect(received).toEqual(expected);
  });
  test('Renders table as child if drafts exist', () => {
    const deepWrapper = shallow(<Drafts {...props} />);
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(1);
  });
  test('Does not render table as child if no drafts exist', () => {
    const modifiedProps = { drafts: null };
    const deepWrapper = shallow(<Drafts {...modifiedProps} />);
    const tableLength = deepWrapper.find(Table).length;
    expect(tableLength).toEqual(0);
  });
});
