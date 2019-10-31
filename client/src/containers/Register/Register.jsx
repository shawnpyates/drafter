import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form } from '../../components';

import { createUser } from '../../actions';

import { register as registerForm } from '../../formContent.json';

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

const validateForm = (formState) => {
  const {
    email,
    passwordFirstInsertion,
    passwordSecondInsertion,
  } = formState;

  if (Object.values(formState).some(value => !value)) {
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
      form: {
        firstName: null,
        lastName: null,
        email: null,
        passwordFirstInsertion: null,
        passwordSecondInsertion: null,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (
      !(prevProps.errorOnAuthenticateUser || prevProps.errorOnCreateUser)
      && (this.props.errorOnAuthenticateUser || this.props.errorOnCreateUser)
    ) {
      this.setErrorMessage(unexpected);
    }
  }

  setErrorMessage = (errorMessage) => {
    this.setState({ errorMessage });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { form } = this.state;
    const { errorMessage } = validateForm(form);
    if (errorMessage) {
      this.setState({ errorMessage });
      return;
    }
    const {
      firstName,
      lastName,
      email,
      passwordFirstInsertion,
    } = form;
    const body = {
      firstName,
      lastName,
      email,
      password: passwordFirstInsertion,
    };
    this.props.createUser(body);
  }

  updateFieldValue = (name, value) => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
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
        hasContainer
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
