/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UpdateUser, { validateForm } from '../UpdateUser';

import { updateUser as updateUserForm } from '../../../formContent.json';

const {
  invalidEmail,
  missingField,
} = updateUserForm.errorMessages;

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: { uuid: 'abc123' },
  },
};

const localState = {
  email: 'foo@bar.com',
};

const wrapper = shallow((
  <UpdateUser
    store={mockStore(store)}
  />
));

describe('<UpdateUser />', () => {
  describe('UpdateUser component', () => {
    test('should render a <UpdateUser /> component', () => {
      const received = wrapper.text();
      const expected = '<UpdateUser />';
      expect(received).toEqual(expected);
    });
  });
  describe('validateForm', () => {
    test('should validate form as success if fields look good', () => {
      const received = validateForm(localState);
      const expected = { success: true };
      expect(received).toEqual(expected);
    });
    test('should reject form if field is missing', () => {
      const modifiedState = { ...localState, email: null };
      const received = validateForm(modifiedState);
      const expected = { errorMessage: missingField };
      expect(received).toEqual(expected);
    });
    test('should reject form if email is invalid', () => {
      const modifiedState = {
        ...localState,
        email: 'notarealemail.com',
      };
      const received = validateForm(modifiedState);
      const expected = { errorMessage: invalidEmail };
      expect(received).toEqual(expected);
    });
  });
});
