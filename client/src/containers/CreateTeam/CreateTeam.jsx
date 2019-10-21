import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Form } from '../../components';

import {
  createRequest,
  createTeam,
  fetchCurrentUser,
} from '../../actions';

import { team as teamForm } from '../../../formConstants.json';

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

const mapDispatchToProps = (dispatch) => ({
  createRequest: body => dispatch(createRequest(body)),
  createTeam: body => dispatch(createTeam(body)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});

const getInputsWithoutDraftSelection = inputs => (
  inputs.filter(input => input.name !== 'shouldFindOwnDraft')
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

class CreateTeam extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      isSubmitComplete: false,
      errorMessage: null,
      buttonsToHighlight: {
        shouldFindOwnDraft: null,
        draftListSelection: null,
      },
      draftNameFromTextField: null,
    };
  }

  componentDidUpdate() {
    if (this.state.errorMessage) {
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, ERROR_MESSAGE_DURATION);
    }
  }
  
  componentWillUnmount() {
    const {
      match: {
        params: { url } = {},
      } = {},
    } = this.props;
    if ((!url || !url.includes('drafts')) && this.state.isSubmitComplete) {
      this.props.fetchCurrentUser();
    }
  }

  getDraftIdParam() {
    const {
      match: {
        params: { id } = {},
      } = {},
    } = this.props;
    return id;
  }

  updateButtonToHighlight = (key, value) => {
    const buttonsToHighlight = {
      ...this.state.buttonsToHighlight,
      [key]: value,
    };
    this.setState({ buttonsToHighlight });
  }

  updateFieldValue = (name, value) => {
    switch (name) {
      case 'shouldFindOwnDraft':
        this.updateButtonToHighlight('shouldFindOwnDraft', value);
        break;
      case 'draftListSelection':
        this.updateButtonToHighlight('draftListSelection', value);
        break;
      default:
        this.setState({ [name]: value });
    }
  }

  createTeamForDraft = (name, draftListSelection) => {
    const draftIdParam = this.getDraftIdParam();
    const { uuid: ownerUserId, Drafts: drafts } = this.props.currentUser;
    const { uuid: draftUuid } = (
      drafts.find(draft => draft.name === draftListSelection) || {}
    );
    const draftIdForBody = (
      draftIdParam
      || draftUuid
    );
    if (!name || !draftIdForBody) {
      this.setState({ errorMessage: missingField });
      return;
    }
    const body = {
      name,
      ownerUserId,
      draftId: draftIdForBody,
    };
    this.props.createTeam(body)
      .then(() => this.setState({ isSubmitComplete: true }));
  }

  createRequestToJoinDraft = (teamName, draftName) => {
    const body = {
      teamName,
      draftName,
      requestCreatorId: this.props.currentUser.uuid,
    };
    if (!teamName || !draftName) {
      this.setState({ errorMessage: missingField });
      return;
    }
    this.props.createRequest(body)
      .then(() => {
        const { createdRequest, errorOnCreateRequest } = this.props;
        if (createdRequest) {
          this.setState({ isSubmitComplete: true });
        }
        if (errorOnCreateRequest) {
          this.setState({ errorMessage: errorOnCreateRequest });
        }
      });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      name: teamName,
      buttonsToHighlight: { draftListSelection },
      draftNameFromTextField,
    } = this.state;
    if (draftNameFromTextField) {
      this.createRequestToJoinDraft(teamName, draftNameFromTextField);
    } else {
      this.createTeamForDraft(teamName, draftListSelection);
    }
  }


  render() {
    const { Drafts: drafts } = this.props.currentUser;
    const { errorMessage, isSubmitComplete, buttonsToHighlight } = this.state;
    const { inputs, title } = teamForm;
    const draftIdParam = this.getDraftIdParam();
    const inputsAfterFilter = draftIdParam && getInputsWithoutDraftSelection(inputs);
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
        {!isSubmitComplete &&
          <Form
            updateFieldValue={this.updateFieldValue}
            handleSubmit={this.handleSubmit}
            title={title}
            formInputs={inputsToRender}
            errorMessage={errorMessage}
            buttonsToHighlight={buttonsToHighlight}
          />
        }
        {isSubmitComplete &&
          <Redirect to={redirectAfterSubmitUrl} />
        }
      </div>
    );
  }
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
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorOnCreateRequest: PropTypes.string,
  fetchDraftsByOwner: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
