import React, { useEffect, useState } from 'react';
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

function Login({
  errorOnAuthenticateUser,
  authenticateUser: authenticateUserPropFn,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [credentials, setCredentials] = useState({ email: null, password: null });

  useEffect(() => {
    const {
      response: {
        data: { failure } = {},
      } = {},
    } = errorOnAuthenticateUser || {};
    if (failure) {
      setErrorMessage(errorMessages[failure]);
    } else {
      setErrorMessage(errorMessages.unexpected);
    }
  }, [errorOnAuthenticateUser]);

  const updateCredentialValue = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = credentials;
    if (!validateEmail(email)) {
      setErrorMessage(errorMessages.invalidEmail);
      return;
    }
    authenticateUserPropFn({ email, password });
  };

  return (
    <Form
      isFormWide
      updateFieldValue={updateCredentialValue}
      handleSubmit={handleSubmit}
      title={loginForm.title}
      formInputs={loginForm.inputs}
      errorMessage={errorMessage}
      hasContainer
    />
  );
}

Login.defaultProps = {
  errorOnAuthenticateUser: null,
};

Login.propTypes = {
  errorOnAuthenticateUser: PropTypes.objectOf(PropTypes.any),
  authenticateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
