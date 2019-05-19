import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Form from '../../components/Form/form';

import { createPlayer } from '../../actions';

import { player as playerForm } from '../../../formConstants.json';

const {
  missingField,
  invalidEmail,
} = playerForm.errorMessages;

const mapStateToProps = (state) => {
  const {
    user: { currentUser },
    draft: { drafts },
  } = state;
  return { currentUser, drafts };
};

const mapDispatchToProps = dispatch => ({
  createPlayer: body => dispatch(createPlayer(body)),
});

const isEmailValid = email => (/\S+@\S+\.\S+/).test(email);

class CreatePlayer extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      email: null,
      position: null,
      isSubmitComplete: false,
      errorMessage: null,
    };
  }

  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      name,
      email,
      position,
    } = this.state;
    if (!name || !position) {
      this.setState({ errorMessage: missingField });
      return;
    }
    if (email && !isEmailValid(email)) {
      this.setState({ errorMessage: invalidEmail });
      return;
    }
    const {
      match: {
        url = '',
        params: { id: orgId } = {},
      },
      currentUser,
    } = this.props;
    const orgKey = (
      url.split(orgId)[0] === '/teams/'
        ? 'teamId'
        : 'draftId'
    );
    const body = {
      name,
      email,
      position,
      creatorUserId: currentUser.id,
      [orgKey]: Number(orgId),
    };
    this.props.createPlayer(body).then(() => this.setState({ isSubmitComplete: true }));
  }


  render() {
    const { errorMessage, isSubmitComplete } = this.state;
    const { inputs, title } = playerForm;
    return (
      <div>
        {!isSubmitComplete &&
          <Form
            updateFieldValue={this.updateFieldValue}
            handleSubmit={this.handleSubmit}
            title={title}
            formInputs={inputs}
            errorMessage={errorMessage}
          />
        }
        {isSubmitComplete &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

CreatePlayer.defaultProps = {
  match: {},
};

CreatePlayer.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  currentUser: PropTypes.number.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
