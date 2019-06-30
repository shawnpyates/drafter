/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Register, { validateForm } from '../register';

import { register as registerForm } from '../../../../formConstants.json';

const {
  missingField,
  passwordsDidNotMatch,
  tooShort,
  invalidEmail,
} = registerForm.errorMessages;

const mockStore = configureStore();

const store = {
  user: {
    errorOnCreateUser: null,
    errorOnAuthenticateUser: null,
  },
};

const mockLocalState = {
  email: 'foo@bar.com',
  passwordFirstInsertion: 'foobarbaz',
  passwordSecondInsertion: 'foobarbaz',
};

describe('<Register />', () => {
  test('should render a <Register /> component', () => {
    const wrapper = shallow(<Register store={mockStore(store)} />);
    const received = wrapper.text();
    const expected = '<Register />';
    expect(received).toEqual(expected);
  });
  test('should validate form as success if fields look good', () => {
    const received = validateForm(mockLocalState);
    const expected = { success: true };
    expect(received).toEqual(expected);
  });
  test('should reject form if field is missing', () => {
    const modifiedState = { ...mockLocalState, email: null };
    const received = validateForm(modifiedState);
    const expected = { errorMessage: missingField };
    expect(received).toEqual(expected);
  });
  test('should reject form if passwords do not match', () => {
    const modifiedState = { ...mockLocalState, passwordSecondInsertion: 'foobarbaz0' };
    const received = validateForm(modifiedState);
    const expected = { errorMessage: passwordsDidNotMatch };
    expect(received).toEqual(expected);
  });
  test('should reject form if passwords are too short', () => {
    const modifiedState = {
      ...mockLocalState,
      passwordFirstInsertion: 'onlyfoo',
      passwordSecondInsertion: 'onlyfoo',
    };
    const received = validateForm(modifiedState);
    const expected = { errorMessage: tooShort };
    expect(received).toEqual(expected);
  });
  test('should reject form if email is invalid', () => {
    const modifiedState = {
      ...mockLocalState,
      email: 'notarealemail.com',
    };
    const received = validateForm(modifiedState);
    const expected = { errorMessage: invalidEmail };
    expect(received).toEqual(expected);
  });
});
