import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../../components/Form/form';

import { createUser } from '../../actions';

import { register as registerForm } from '../../../formConstants.json';

const { inputs: formInputs } = registerForm;

const {
  missingField,
  passwordsDidNotMatch,
  tooShort,
  invalidEmail,
  unexpected,
} = registerForm.errorMessages;

const mapStateToProps = (state) => {
  const { errorOnCreateUser, errorOnAuthenticateUser } = state.user;
  return { errorOnCreateUser, errorOnAuthenticateUser };
};

const mapDispatchToProps = dispatch => ({
  createUser: body => dispatch(createUser(body)),
});

const isEmailValid = email => (/\S+@\S+\.\S+/).test(email);

const validateForm = (state) => {
  const {
    email,
    passwordFirstInsertion,
    passwordSecondInsertion,
  } = state;

  if (Object.values(state).some(value => !value)) {
    return { errorMessage: missingField };
  }

  if (passwordFirstInsertion !== passwordSecondInsertion) {
    return { errorMessage: passwordsDidNotMatch };
  }

  if (passwordFirstInsertion.length < registerForm.passwordMinimumLength) {
    return { errorMessage: tooShort };
  }

  if (!isEmailValid(email)) {
    return { errorMessage: invalidEmail };
  }

  return { success: true };
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      firstName: null,
      lastName: null,
      email: null,
      passwordFirstInsertion: null,
      passwordSecondInsertion: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorOnAuthenticateUser || nextProps.errorOnCreateUser) {
      this.setState({ errorMessage: unexpected });
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { errorMessage } = validateForm(this.state);
    if (errorMessage) {
      this.setState({ errorMessage });
      return;
    }
    const {
      firstName,
      lastName,
      email,
      passwordFirstInsertion,
    } = this.state;
    const body = {
      firstName,
      lastName,
      email,
      password: passwordFirstInsertion,
    };
    this.props.createUser(body);
  }

  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <Form
        isFormWide
        updateFieldValue={this.updateFieldValue}
        handleSubmit={this.handleSubmit}
        title={registerForm.title}
        formInputs={formInputs}
        errorMessage={errorMessage}
      />
    );
  }
}

Register.defaultProps = {
  errorOnCreateUser: null,
  errorOnAuthenticateUser: null,
};

Register.propTypes = {
  errorOnCreateUser: PropTypes.objectOf(PropTypes.any),
  errorOnAuthenticateUser: PropTypes.objectOf(PropTypes.any),
  createUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
exports.validateForm = validateForm;
