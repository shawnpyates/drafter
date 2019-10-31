/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';

import Table from '../Table';
import { draftsTable as draftsTableTexts } from '../../../texts.json';
import { drafts } from '../../../../../testData.json';

const { columnHeaders, noneScheduled, type } = draftsTableTexts;

const draftsData = drafts.map(draft => ({
  uuid: draft.uuid,
  name: draft.name,
  readableTime: draft.timeScheduled || 'Unscheduled',
  ownerName: 'Foo Bar',
}));

/* eslint react/prop-types: [0] */
jest.mock('react-router-dom', () => ({
  Link: props => <div>{props.children}</div>,
}));

const props = {
  data: draftsData,
  columnHeaders,
  emptyDataMessage: noneScheduled,
  type,
};

const wrapper = shallow(<Table {...props} />);

describe('<Table />', () => {
  test('Renders a styled Table component', () => {
    const received = wrapper.text();
    const expected = '<styled.div />';
    expect(received).toEqual(expected);
  });
  test('Renders all data in table if data exists', () => {
    const tableHtml = wrapper.html();
    let dataValues = [];
    draftsData.forEach((draft) => {
      const { uuid, ...dataEntryMinusId } = draft;
      dataValues = dataValues.concat(Object.values(dataEntryMinusId));
    });
    const areAllValuesInHtml = dataValues.every(val => tableHtml.includes(val));
    expect(areAllValuesInHtml).toBe(true);
  });
  test('Indicates none schedule if data empty', () => {
    const modifiedProps = { ...props, data: [] };
    const modifiedWrapper = shallow(<Table {...modifiedProps} />);
    const tableHtml = modifiedWrapper.html();
    expect(tableHtml).toContain(noneScheduled);
  });
});
