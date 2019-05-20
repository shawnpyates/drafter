import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Form from '../../components/Form/form';

import { createTeam, fetchDraftsByOwner } from '../../actions';

import { team as teamForm } from '../../../formConstants.json';

const mapStateToProps = (state) => {
  const {
    user: { currentUser },
    draft: { drafts },
  } = state;
  return { currentUser, drafts };
};

const mapDispatchToProps = dispatch => ({
  createTeam: body => dispatch(createTeam(body)),
  fetchDraftsByOwner: ownerUserId => dispatch(fetchDraftsByOwner(ownerUserId)),
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
        draftListSelectionSelection: null,
      },
      draftIdFromTextField: null,
    };
  }

  componentDidUpdate() {
    const { buttonsToHighlight } = this.state;
    const { currentUser, drafts } = this.props;
    if (buttonsToHighlight.shouldFindOwnDraft && !drafts) {
      this.props.fetchDraftsByOwner(currentUser.uuid);
    }
  }

  getDraftIdParam() {
    const {
      match: {
        params: { id } = {},
      },
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

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      name,
      buttonsToHighlight: { draftListSelection },
      draftIdFromTextField,
    } = this.state;
    const draftIdParam = this.getDraftIdParam();
    const draftIdForBody = (
      draftIdParam
      || (
        draftListSelection
          ? (this.props.drafts.find(draft => draft.name === draftListSelection)).uuid
          : Number(draftIdFromTextField)
      )
    );
    if (!name || !draftIdForBody) {
      this.setState({ errorMessage: 'Please complete all fields.' });
      return;
    }
    const body = {
      name,
      ownerUserId: this.props.currentUser.uuid,
      draftId: draftIdForBody,
    };
    this.props.createTeam(body).then(() => this.setState({ isSubmitComplete: true }));
  }


  render() {
    const { drafts } = this.props;
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
  match: {},
};

CreateTeam.propTypes = {
  createTeam: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchDraftsByOwner: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
