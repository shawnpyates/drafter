import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import uuidv4 from 'uuid';

import { Form, QuickCreateForm } from '../../components';

import {
  createRequest,
  createTeam,
  fetchCurrentUser,
  fetchOneTeam,
  resetRequestState,
  resetTeamState,
  updateTeam,
} from '../../actions';

import { team as teamForm } from '../../formContent.json';

const { missingField } = teamForm.errorMessages;

const ERROR_MESSAGE_DURATION = 2000;

const mapStateToProps = (state) => {
  const {
    user: { currentUser },
    request: { created: isRequestCreated, errorOnCreateRequest },
    team: {
      currentTeam,
      fetching: isFetchingTeam,
      created: isTeamCreated,
      updated: isTeamUpdated,
    },
  } = state;
  return {
    currentTeam,
    currentUser,
    isRequestCreated,
    errorOnCreateRequest,
    isFetchingTeam,
    isRequestCreated,
    isTeamCreated,
    isTeamUpdated,
  };
};

const mapDispatchToProps = dispatch => ({
  createRequest: body => dispatch(createRequest(body)),
  createTeam: body => dispatch(createTeam(body)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchOneTeam: id => dispatch(fetchOneTeam(id)),
  resetRequestState: () => dispatch(resetRequestState()),
  resetTeamState: () => dispatch(resetTeamState()),
  updateTeam: (id, body) => dispatch(updateTeam(id, body)),
});

const getInputsWithoutDraftSelection = inputs => (
  inputs.filter(input => (
    input.name !== 'shouldFindOwnDraft'
    && !(input.dependsOn && input.dependsOn.name === 'shouldFindOwnDraft')
  ))
);

const getInputsWithDrafts = (inputs, drafts) => {
  const clonedInputs = [...inputs];
  const draftListSelectionInput = clonedInputs.find(input => input.name === 'draftListSelection');
  const draftOptions = drafts.map(draft => ({
    label: draft.name,
    value: draft.name,
    isWide: true,
  }));
  clonedInputs[clonedInputs.indexOf(draftListSelectionInput)] = {
    ...draftListSelectionInput,
    options: draftOptions,
  };
  return clonedInputs;
};

function CreateTeam({
  createRequest: createRequestPropFn,
  createTeam: createTeamPropFn,
  currentTeam,
  currentUser,
  errorOnCreateRequest,
  fetchCurrentUser: fetchCurrentUserPropFn,
  fetchOneTeam: fetchOneTeamPropFn,
  isFetchingTeam,
  isRequestCreated,
  isTeamCreated,
  isTeamUpdated,
  match,
  resetRequestState: resetRequestStatePropFn,
  resetTeamState: resetTeamStatePropFn,
  updateTeam: updateTeamPropFn,
}) {
  const { url, params: { id: urlIdParam } = {} } = match;
  const isInUpdateMode = url && url.split(urlIdParam)[1] === '/update';

  const [name, setName] = useState(null);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonsToHighlight, setButtonsToHighlight] = useState({
    shouldFindOwnDraft: null,
    draftListSelection: null,
  });
  const [draftNameFromTextField, setDraftNameFromTextField] = useState(null);
  const [quickCreateForm, setQuickCreateForm] = useState(urlIdParam ? [{ id: uuidv4() }] : null);

  useEffect(() => {
    if (!currentTeam && isInUpdateMode) {
      fetchOneTeamPropFn(urlIdParam);
    } else if (currentTeam) {
      setQuickCreateForm([{
        ...quickCreateForm[0],
        name: currentTeam.name,
      }]);
    }
  }, [currentTeam]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, ERROR_MESSAGE_DURATION);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isRequestCreated || isTeamCreated || isTeamUpdated) {
      setIsSubmitComplete(true);
    }
  }, [isRequestCreated, isTeamCreated, isTeamUpdated]);

  useEffect(() => (
    function cleanup() {
      resetRequestStatePropFn();
      resetTeamStatePropFn();
      fetchCurrentUserPropFn();
    }
  ), []);

  useEffect(() => {
    if (errorOnCreateRequest) {
      setErrorMessage(errorOnCreateRequest);
    }
  }, [errorOnCreateRequest]);

  const updateFieldValue = ({
    name: keyName,
    value,
    rowNumChangeVal,
    index,
  }) => {
    if (urlIdParam) {
      if (rowNumChangeVal === 1) {
        setQuickCreateForm([...quickCreateForm, { id: uuidv4() }]);
      } else if (rowNumChangeVal === -1) {
        setQuickCreateForm([
          ...quickCreateForm.slice(0, index),
          ...quickCreateForm.slice(index + 1),
        ]);
      } else {
        const rowToChange = quickCreateForm[index];
        const updatedRow = { ...rowToChange, [keyName]: value };
        setQuickCreateForm([
          ...quickCreateForm.slice(0, index),
          updatedRow,
          ...quickCreateForm.slice(index + 1),
        ]);
      }
      return;
    }
    switch (keyName) {
      case 'shouldFindOwnDraft':
      case 'draftListSelection':
        setButtonsToHighlight({ ...buttonsToHighlight, [keyName]: value });
        break;
      case 'draftNameFromTextField':
        setDraftNameFromTextField(value);
        break;
      case 'name':
        setName(value);
        break;
      default:
        break;
    }
  };

  const createTeamForDraft = (teamName, draftListSelection) => {
    const { uuid: ownerUserId, Drafts: drafts } = currentUser;
    const { uuid: draftUuid } = (
      drafts.find(draft => draft.name === draftListSelection) || {}
    );
    const draftIdForBody = (
      urlIdParam
      || draftUuid
    );
    if (!teamName || !draftIdForBody) {
      setErrorMessage(missingField);
      return;
    }
    const body = {
      name: teamName,
      ownerUserId,
      draftId: draftIdForBody,
    };
    createTeamPropFn(body);
  };

  const createManyTeamsForDraft = () => {
    if (quickCreateForm.some(row => !row.name)) {
      setErrorMessage(missingField);
      return null;
    }
    const body = quickCreateForm.map((row) => {
      const rowWithMetaData = {
        name: row.name,
        draftId: urlIdParam,
        ownerUserId: currentUser.uuid,
      };
      return rowWithMetaData;
    });
    createTeamPropFn(body);
  };

  const createRequestToJoinDraft = (teamName, draftName) => {
    const body = {
      teamName,
      draftName,
      requestCreatorId: currentUser.uuid,
    };
    if (!teamName || !draftName) {
      setErrorMessage(missingField);
      return;
    }
    createRequestPropFn(body);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (isInUpdateMode) {
      if (!quickCreateForm[0].name) {
        setErrorMessage(missingField);
        return;
      }
      updateTeamPropFn(urlIdParam, { name: quickCreateForm[0].name })
      return;
    }
    const { draftListSelection } = buttonsToHighlight;
    if (draftNameFromTextField) {
      createRequestToJoinDraft(name, draftNameFromTextField);
    } else if (quickCreateForm) {
      createManyTeamsForDraft();
    } else {
      createTeamForDraft(name, draftListSelection);
    }
  };

  const { Drafts: drafts } = currentUser;
  const {
    inputs,
    title,
    quickCreateTitle,
    titleForUpdate,
  } = teamForm;
  const inputsAfterFilter = quickCreateForm && getInputsWithoutDraftSelection(inputs);

  const inputsToRender = (
    inputsAfterFilter
    || (
      drafts && drafts.length
        ? getInputsWithDrafts(inputs, drafts)
        : inputs
    )
  );
  const redirectAfterSubmitUrl = (
    isInUpdateMode
      ? `/teams/${urlIdParam}/show`
      : urlIdParam
        ? `/drafts/${urlIdParam}/show`
        : '/'
  );

  return (
    <div>
      {((!isSubmitComplete && !(isInUpdateMode && (isFetchingTeam || !currentTeam))))
      && (
        quickCreateForm
          ? (
            <QuickCreateForm
              updateFieldValue={updateFieldValue}
              handleSubmit={handleSubmit}
              title={isInUpdateMode ? titleForUpdate : quickCreateTitle}
              formInputs={inputsToRender}
              errorMessage={errorMessage}
              currentValues={quickCreateForm}
              shouldDisplayAddRowButton={!isInUpdateMode}
            />
          ) : (
            <Form
              updateFieldValue={updateFieldValue}
              handleSubmit={handleSubmit}
              title={title}
              formInputs={inputsToRender}
              errorMessage={errorMessage}
              buttonsToHighlight={buttonsToHighlight}
            />
          )
      )}
      {isSubmitComplete
      && <Redirect to={redirectAfterSubmitUrl} />
      }
    </div>
  );
}

CreateTeam.defaultProps = {
  isRequestCreated: null,
  currentTeam: null,
  errorOnCreateRequest: null,
  match: {},
};

CreateTeam.propTypes = {
  createRequest: PropTypes.func.isRequired,
  isRequestCreated: PropTypes.objectOf(PropTypes.any),
  createTeam: PropTypes.func.isRequired,
  currentTeam: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  errorOnCreateRequest: PropTypes.string,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchOneTeam: PropTypes.func.isRequired,
  isFetchingTeam: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  updateTeam: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
