import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form } from '../../components';

import { createUser } from '../../actions';

import { register as registerForm } from '../../formContent.json';

const { inputs: formInputs } = registerForm;

const {
  missingField: MISSING_FIELD,
  passwordsDidNotMatch: PASSWORDS_DID_NOT_MATCH,
  tooShort: TOO_SHORT,
  invalidEmail: INVALID_EMAIL,
  unexpected: UNEXPECTED_ERROR,
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
    return { errorMessage: MISSING_FIELD };
  }

  if (passwordFirstInsertion !== passwordSecondInsertion) {
    return { errorMessage: PASSWORDS_DID_NOT_MATCH };
  }

  if (passwordFirstInsertion.length < registerForm.passwordMinimumLength) {
    return { errorMessage: TOO_SHORT };
  }

  if (!isEmailValid(email)) {
    return { errorMessage: INVALID_EMAIL };
  }

  return { success: true };
};

function Register({
  errorOnAuthenticateUser,
  errorOnCreateUser,
  createUser: createUserPropFn,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState({
    firstName: null,
    lastName: null,
    email: null,
    passwordFirstInsertion: null,
    passwordSecondInsertion: null,
  });

  useEffect(() => {
    if (errorOnAuthenticateUser || errorOnCreateUser) {
      setErrorMessage(UNEXPECTED_ERROR);
    }
  }, [errorOnAuthenticateUser, errorOnCreateUser]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { errorMessage: validationErrorMessage } = validateForm(form);
    if (validationErrorMessage) {
      setErrorMessage(validationErrorMessage);
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
    createUserPropFn(body);
  };

  const updateFormValue = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <Form
      isFormWide
      updateFieldValue={updateFormValue}
      handleSubmit={handleSubmit}
      title={registerForm.title}
      formInputs={formInputs}
      errorMessage={errorMessage}
      hasContainer
    />
  );
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
