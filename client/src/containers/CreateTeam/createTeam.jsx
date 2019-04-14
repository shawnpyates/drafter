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

const getInputsWithDrafts = (inputs, drafts) => {
  const clonedInputs = [...inputs];
  const draftListInput = clonedInputs.find(input => input.name === 'draftList');
  const draftOptions = drafts.map(draft => ({
    label: draft.name,
    value: draft.name,
    isWide: true,
  }));
  clonedInputs[clonedInputs.indexOf(draftListInput)] = {
    ...draftListInput,
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
        draftList: null,
      },
      draftId: null,
    };
  }

  componentDidUpdate() {
    const { buttonsToHighlight } = this.state;
    const { currentUser, drafts } = this.props;
    if (buttonsToHighlight.shouldFindOwnDraft && !drafts) {
      this.props.fetchDraftsByOwner(currentUser.id);
    }
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
      case 'draftList':
        this.updateButtonToHighlight('draftList', value);
        break;
      default:
        this.setState({ [name]: value });
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      name,
      buttonsToHighlight: { shouldFindOwnDraft, draftList },
      draftId,
    } = this.state;
    if (!name || (!draftList && !draftId)) {
      this.setState({ errorMessage: 'Please complete all fields.' });
      return;
    }
    const draftIdForBody = (
      shouldFindOwnDraft
        ? (this.props.drafts.find(draft => draft.name === draftList)).id
        : Number(draftId)
    );
    const body = {
      name,
      ownerUserId: this.props.currentUser.id,
      draftId: draftIdForBody,
    };
    this.props.createTeam(body).then(() => this.setState({ isSubmitComplete: true }));
  }


  render() {
    const { drafts } = this.props;
    const { errorMessage, isSubmitComplete, buttonsToHighlight } = this.state;
    const { inputs, title } = teamForm;
    const inputsToRender = (
      drafts && drafts.length
        ? getInputsWithDrafts(inputs, drafts)
        : inputs
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
          <Redirect to="/" />
        }
      </div>
    );
  }
}

CreateTeam.propTypes = {
  createTeam: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchDraftsByOwner: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
