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
    if (!this.isFormValid()) return;
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

  isFormValid() {
    const { errorMessage, ...fieldState } = this.state;
    const {
      passwordFirstInsertion,
      passwordSecondInsertion,
      email,
    } = fieldState;

    const values = Object.values(fieldState);

    const isEmpty = value => !value;

    if (values.some(isEmpty)) {
      this.setState({ errorMessage: missingField });
      return false;
    }

    if (passwordFirstInsertion !== passwordSecondInsertion) {
      this.setState({ errorMessage: passwordsDidNotMatch });
      return false;
    }

    if (passwordFirstInsertion.length < registerForm.passwordMinimumLength) {
      this.setState({ errorMessage: tooShort });
      return false;
    }

    if (!isEmailValid(email)) {
      this.setState({ errorMessage: invalidEmail });
      return false;
    }

    return true;
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
