/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import CreateDraft, { validateForm } from '../CreateDraft';
import { Form } from '../../../components';

import { draft as draftForm } from '../../../formContent.json';

const {
  missingField,
  mustBeFutureTime,
} = draftForm.errorMessages;

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: { uuid: 'abc123' },
  },
  draft: {
    currentDraft: { uuid: 'def456' },
  },
};

const props = {
  match: {
    params: { id: 'foo' },
  },
};

const GET_THREE_DAYS_FROM_NOW_TIMESTAMP = () => {
  const date = new Date();
  return date.setDate(date.getDate() + 3);
};

const localState = {
  name: 'Foo',
  calendarDate: moment(GET_THREE_DAYS_FROM_NOW_TIMESTAMP()),
  timeCharsAsString: '5:50',
  isPmSelected: true,
  buttonsToHighlight: {
    shouldScheduleTime: true,
  },
  preexistingValues: {
    name: null,
    shouldScheduleTime: null,
    scheduledTime: null,
  },
};

const wrapper = shallow(<CreateDraft {...props} store={mockStore(store)} />);

describe('<CreateDraft />', () => {
  describe('CreateDraft component', () => {
    test('should render a <CreateDraft /> component', () => {
      const received = wrapper.text();
      const expected = '<CreateDraft />';
      expect(received).toEqual(expected);
    });
    test('should render a <Form /> component as child if form not submitted yet', () => {
      const deepWrapper = wrapper.dive().dive();
      deepWrapper.setState({ isSubmitComplete: false });
      const formLength = deepWrapper.find(Form).length;
      expect(formLength).toEqual(1);
    });
    test('should not render <Form /> component as child if form submitted', () => {
      const deepWrapper = wrapper.dive().dive();
      deepWrapper.setState({ isSubmitComplete: true });
      const formLength = deepWrapper.find(Form).length;
      expect(formLength).toEqual(0);
    });
  });
  describe('validateForm', () => {
    test('returns finalTimeStamp and name if form valid', () => {
      const threeDaysFromNow = moment(GET_THREE_DAYS_FROM_NOW_TIMESTAMP());
      const formattedDate = threeDaysFromNow.format('YYYY-MM-DD');
      const received = validateForm(localState);
      expect(received.finalTimeStamp.split(' ')[0]).toEqual(formattedDate);
      expect(received.name).toEqual(localState.name);
    });
    test('rejects if user has chosen to schedule time but time is not provided', () => {
      const modifiedState = { ...localState, timeCharsAsString: null };
      const received = validateForm(modifiedState);
      const expected = { errorMessage: missingField };
      expect(received).toEqual(expected);
    });
    test('rejects if user has chosen to schedule time in the past', () => {
      const modifiedState = {
        ...localState,
        calendarDate: moment(),
        timeCharsAsString: '12:00',
        isPmSelected: false,
      };
      const received = validateForm(modifiedState);
      const expected = { errorMessage: mustBeFutureTime };
      expect(received).toEqual(expected);
    });
  });
});
