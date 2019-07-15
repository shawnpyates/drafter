/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';

import Header from '../header';
import { header as headerTexts } from '../../../../texts.json';

const { logOut, notLoggedIn } = headerTexts;

/* eslint react/prop-types: [0] */
jest.mock('react-router-dom', () => ({
  Link: props => <div>{props.children}</div>,
}));

const props = {
  currentUser: { uuid: 'abc123', email: 'foo@bar.com' },
};

const wrapper = shallow(<Header {...props} />);

describe('<Header />', () => {
  test('Renders a styled Header component', () => {
    const received = wrapper.text();
    const expected = '<styled.header />';
    expect(received).toEqual(expected);
  });
  test('If user is logged in, displays email and logout option', () => {
    const received = wrapper.html();
    expect(received).toContain(props.currentUser.email);
    expect(received).toContain(logOut);
  });
  test('If user is not logged in, indicates not logged in', () => {
    const modifiedProps = { currentUser: null };
    const modifiedWrapper = shallow(<Header {...modifiedProps} />);
    const received = modifiedWrapper.html();
    expect(received).toContain(notLoggedIn);
  });
});
