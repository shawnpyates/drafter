/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';

import ProfileCard from '../profileCard';

/* eslint react/prop-types: [0] */
jest.mock('react-router-dom', () => ({
  Link: props => <div>{props.children}</div>,
}));

const props = { data: { email: 'foo@bar.com', name: 'Foo Bar' } };

const wrapper = shallow(<ProfileCard {...props} />);

describe('<ProfileCard />', () => {
  test('Renders a styled ProfileCard component', () => {
    const received = wrapper.text();
    const expected = '<styled.div />';
    expect(received).toEqual(expected);
  });
  test('Renders data keys in first ul', () => {
    const dataTable = wrapper.childAt(2);
    const dataKeys = Object.keys(props.data);
    const firstUlHtml = dataTable.childAt(0).html();
    const isEveryKeyInHtml = dataKeys.every(key => firstUlHtml.includes(key));
    expect(isEveryKeyInHtml).toBe(true);
  });
  test('Renders data values in second ul', () => {
    const dataTable = wrapper.childAt(2);
    const dataValues = Object.values(props.data);
    const secondUlHtml = dataTable.childAt(1).html();
    const isEveryValueInHtml = dataValues.every(val => secondUlHtml.includes(val));
    expect(isEveryValueInHtml).toBe(true);
  });
});
