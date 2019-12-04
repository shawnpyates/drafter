/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CreatePlayer, { validateForm } from '../CreatePlayer';
import { Form } from '../../../components';

import { player as playerForm } from '../../../formContent.json';

const {
  invalidEmail,
  missingField,
} = playerForm.errorMessages;

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: { uuid: 'abc123' },
  },
  player: {
    currentPlayer: null,
  }
};

const props = {
  match: {
    url: 'http://foo.com/def234/createPlayer',
    params: {
      id: 'def234',
    },
  },
};

const localState = {
  name: 'Foo Bar',
  email: 'foo@bar.com',
  position: 'Defence',
};

const wrapper = shallow(<CreatePlayer {...props} store={mockStore(store)} />);

describe('<CreatePlayer />', () => {
  describe('CreatePlayer component', () => {
    test('should render a <CreatePlayer /> component', () => {
      const received = wrapper.text();
      const expected = '<CreatePlayer />';
      expect(received).toEqual(expected);
    });
  });
  describe('validateForm', () => {
    test('returns success if fields are valid', () => {
      const received = validateForm(localState);
      expect(received.success).toBe(true);
    });
    test('returns success even if optional email is missing', () => {
      const modifiedState = { ...localState, email: null };
      const received = validateForm(modifiedState);
      expect(received.success).toBe(true);
    });
    test('rejects if required field is missing', () => {
      const modifiedState = { ...localState, position: null };
      const received = validateForm(modifiedState);
      const expected = { validationErrorMessage: missingField };
      expect(received).toEqual(expected);
    });
    test('rejects if email is provided but is not valid email', () => {
      const modifiedState = { ...localState, email: 'notarealemail@toobad' };
      const received = validateForm(modifiedState);
      const expected = { validationErrorMessage: invalidEmail };
      expect(received).toEqual(expected);
    });
  });
});
