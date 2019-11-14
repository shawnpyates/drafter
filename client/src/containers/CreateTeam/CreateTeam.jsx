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
} from '../../actions';

import { team as teamForm } from '../../formContent.json';

const { missingField } = teamForm.errorMessages;

const ERROR_MESSAGE_DURATION = 2000;

const mapStateToProps = (state) => {
  const {
    user: { currentUser },
    request: { createdRequest, errorOnCreateRequest },
  } = state;
  return {
    currentUser,
    createdRequest,
    errorOnCreateRequest,
  };
};

const mapDispatchToProps = dispatch => ({
  createRequest: body => dispatch(createRequest(body)),
  createTeam: body => dispatch(createTeam(body)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
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
  createdRequest,
  createTeam: createTeamPropFn,
  currentUser,
  errorOnCreateRequest,
  fetchCurrentUser: fetchCurrentUserPropFn,
  match,
}) {
  const { params: { id: draftIdParam, url } = {} } = match;

  const [name, setName] = useState(null);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonsToHighlight, setButtonsToHighlight] = useState({
    shouldFindOwnDraft: null,
    draftListSelection: null,
  });
  const [draftNameFromTextField, setDraftNameFromTextField] = useState(null);
  const [quickCreateForm, setQuickCreateForm] = useState(draftIdParam ? [{ id: uuidv4() }] : null);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, ERROR_MESSAGE_DURATION);
    }
  }, [errorMessage]);

  useEffect(() => (
    function cleanup() {
      if ((!url || !url.includes('drafts')) && isSubmitComplete) {
        fetchCurrentUserPropFn();
      }
    }
  ));

  const updateFieldValue = ({
    name: keyName,
    value,
    rowNumChangeVal,
    index,
  }) => {
    if (draftIdParam) {
      if (rowNumChangeVal === 1) {
        setQuickCreateForm([...quickCreateForm, { id: uuidv4() }]);
      } else if (rowNumChangeVal === -1) {
        setQuickCreateForm([
          ...quickCreateForm.slice(0, index),
          ...quickCreateForm.slice(index + 1),
        ]);
      } else {
        const rowToChange = quickCreateForm[index];
        const updatedRow = { ...rowToChange, [name]: value };
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
      draftIdParam
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
    createTeamPropFn(body).then(() => setIsSubmitComplete(true));
  };

  const createManyTeamsForDraft = () => {
    if (quickCreateForm.some(row => !row.name)) {
      setErrorMessage(missingField);
      return null;
    }
    const body = quickCreateForm.map((row) => {
      // IDs are for UI rendering purposes only, remove before sending req
      const { id, ...rowWithIdRemoved } = row;
      return rowWithIdRemoved;
    });
    return createTeamPropFn(body).then(() => setIsSubmitComplete(true));
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
    createRequestPropFn(body)
      .then(() => {
        if (createdRequest) {
          setIsSubmitComplete(true);
        }
        if (errorOnCreateRequest) {
          setErrorMessage(errorOnCreateRequest);
        }
      });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
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
  const { inputs, title, quickCreateTitle } = teamForm;
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
    draftIdParam
      ? `/drafts/${draftIdParam}/show`
      : '/'
  );

  return (
    <div>
      {!isSubmitComplete
      && (
        quickCreateForm
          ? (
            <QuickCreateForm
              updateFieldValue={updateFieldValue}
              handleSubmit={handleSubmit}
              title={quickCreateTitle}
              formInputs={inputsToRender}
              errorMessage={errorMessage}
              currentValues={quickCreateForm}
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
  createdRequest: null,
  errorOnCreateRequest: null,
  match: {},
};

CreateTeam.propTypes = {
  createRequest: PropTypes.func.isRequired,
  createdRequest: PropTypes.objectOf(PropTypes.any),
  createTeam: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  errorOnCreateRequest: PropTypes.string,
  fetchCurrentUser: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
