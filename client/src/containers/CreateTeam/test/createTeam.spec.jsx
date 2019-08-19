/* global describe, expect, jest, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CreateTeam from '../CreateTeam';
import { Form } from '../../../components';

import { team as teamForm } from '../../../../formConstants.json';

import { drafts as draftsTestData } from '../../../../../testData.json';

const { missingField } = teamForm.errorMessages;

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: { uuid: 'abc123' },
  },
  draft: {
    drafts: draftsTestData,
  },
};

const mockActionFn = jest.fn().mockImplementation(() => (
  new Promise(resolve => resolve())
));

const wrapper = shallow((
  <CreateTeam
    store={mockStore(store)}
  />
));

describe('<CreateTeam />', () => {
  describe('CreateTeam component', () => {
    test('should render a <CreateTeam /> component', () => {
      const received = wrapper.text();
      const expected = '<CreateTeam />';
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
  describe('createTeamForDraft', () => {
    const createTeamMock = mockActionFn;
    test('calls createTeam action with page ID param if exists', () => {
      const deepWrapper = wrapper.dive().dive();
      const { createTeamForDraft } = deepWrapper.instance();
      deepWrapper.setProps({
        createTeam: createTeamMock,
        match: { params: { id: '401' } },
      });
      createTeamForDraft('Sharks');
      expect(createTeamMock).toHaveBeenCalledWith({
        name: 'Sharks',
        ownerUserId: store.user.currentUser.uuid,
        draftId: '401',
      });
    });
    test('calls createTeam action with ID from selected button if no page ID param', () => {
      const deepWrapper = wrapper.dive().dive();
      const { createTeamForDraft } = deepWrapper.instance();
      deepWrapper.setProps({ createTeam: createTeamMock });
      createTeamForDraft('Sharks', 'FooDraft');
      expect(createTeamMock).toHaveBeenCalledWith({
        name: 'Sharks',
        ownerUserId: store.user.currentUser.uuid,
        draftId: '400',
      });
    });
    test('cancels call and displays error if missing field', () => {
      const deepWrapper = wrapper.dive().dive();
      const { createTeamForDraft } = deepWrapper.instance();
      deepWrapper.setProps({ createTeam: createTeamMock });
      createTeamForDraft('Sharks', null);
      const errorMessage = deepWrapper.state('errorMessage');
      expect(errorMessage).toEqual(missingField);
    });
  });
  describe('createRequestToJoinDraft', () => {
    const createRequestMock = mockActionFn;
    test('calls createRequest action if payload is correct', () => {
      const deepWrapper = wrapper.dive().dive();
      const { createRequestToJoinDraft } = deepWrapper.instance();
      deepWrapper.setProps({ createRequest: createRequestMock });
      createRequestToJoinDraft('Sharks', 'FooDraft');
      expect(createRequestMock).toHaveBeenCalledWith({
        teamName: 'Sharks',
        draftName: 'FooDraft',
        requestCreatorId: store.user.currentUser.uuid,
      });
    });
    test('cancels call and displays error if missing field', () => {
      const deepWrapper = wrapper.dive().dive();
      const { createRequestToJoinDraft } = deepWrapper.instance();
      deepWrapper.setProps({ createRequest: createRequestMock });
      createRequestToJoinDraft(null, 'FooDraft');
      const errorMessage = deepWrapper.state('errorMessage');
      expect(errorMessage).toEqual(missingField);
    });
  });
});
