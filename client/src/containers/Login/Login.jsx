import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form } from '../../components';

import { authenticateUser } from '../../actions';

import { login as loginForm } from '../../formContent.json';

const { errorMessages } = loginForm;

const mapStateToProps = (state) => {
  const { errorOnAuthenticateUser } = state.user;
  return { errorOnAuthenticateUser };
};

const mapDispatchToProps = dispatch => ({
  authenticateUser: credentials => dispatch(authenticateUser(credentials)),
});

const validateEmail = email => (/\S+@\S+\.\S+/).test(email);

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      email: null,
      password: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.errorOnAuthenticateUser && this.props.errorOnAuthenticateUser) {
      const { failure } = this.props.errorOnAuthenticateUser.response.data;
      if (failure) {
        this.setErrorMessage(errorMessages[failure]);
      } else {
        this.setErrorMessage(errorMessages.unexpected);
      }
    }
  }

  setErrorMessage = (errorMessage) => {
    this.setState({ errorMessage });
  }

  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateEmail(this.state.email)) {
      this.setState({ errorMessage: errorMessages.invalidEmail });
      return;
    }
    const { email, password } = this.state;
    this.props.authenticateUser({ email, password });
  }

  render() {
    return (
      <Form
        isFormWide
        updateFieldValue={this.updateFieldValue}
        handleSubmit={this.handleSubmit}
        title={loginForm.title}
        formInputs={loginForm.inputs}
        errorMessage={this.state.errorMessage}
        hasContainer
      />
    );
  }
}

Login.defaultProps = {
  errorOnAuthenticateUser: null,
};

Login.propTypes = {
  errorOnAuthenticateUser: PropTypes.objectOf(PropTypes.any),
  authenticateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
