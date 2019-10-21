import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Form } from '../../components';

import { createPlayer } from '../../actions';

import { player as playerForm } from '../../../formConstants.json';

const {
  missingField,
  invalidEmail,
} = playerForm.errorMessages;

const mapStateToProps = (state) => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = dispatch => ({
  createPlayer: body => dispatch(createPlayer(body)),
});

const isEmailValid = email => (/\S+@\S+\.\S+/).test(email);

const validateForm = ({ name, email, position }) => {
  if (!name || !position) {
    return { errorMessage: missingField };
  }
  if (email && !isEmailValid(email)) {
    return { errorMessage: invalidEmail };
  }
  return { success: true };
};

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

  getUrlNamespaces = () => {
    const {
      match: {
        url = '',
        params: { id } = {},
      },
    } = this.props;
    return {
      type: url.split(id)[0],
      id,
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
    const { errorMessage } = validateForm({ name, email, position });
    if (errorMessage) {
      this.setState({ errorMessage });
      return;
    }

    const urlNamespace = this.getUrlNamespaces();
    const orgKey = urlNamespace.type === '/teams/' ? 'teamId' : 'draftId';
    const { currentUser } = this.props;
    const body = {
      name,
      email,
      position,
      creatorUserId: currentUser.uuid,
      [orgKey]: urlNamespace.id,
    };
    this.props.createPlayer(body).then(() => this.setState({ isSubmitComplete: true }));
  }


  render() {
    const { url } = this.props.match;
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
          <Redirect to={url.replace('/createPlayers', '/show')} />
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
exports.validateForm = validateForm;
