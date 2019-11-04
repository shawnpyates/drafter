import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Form } from '../../components';

import { updateUser } from '../../actions';

import { updateUser as updateUserForm } from '../../formContent.json';

const { inputs: formInputs } = updateUserForm;

const {
  missingField: MISSING_FIELD,
  invalidEmail: INVALID_EMAIL,
  unexpected: UNEXPECTED_ERROR,
} = updateUserForm.errorMessages;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const mapDispatchToProps = dispatch => ({
  updateUser: (id, body) => dispatch(updateUser(id, body)),
});

const isEmailValid = email => (/\S+@\S+\.\S+/).test(email);

const validateForm = (formState) => {
  const {
    email,
  } = formState;

  if (Object.values(formState).some(value => !value)) {
    return { errorMessage: MISSING_FIELD };
  }

  if (!isEmailValid(email)) {
    return { errorMessage: INVALID_EMAIL };
  }
  return { success: true };
};

function UpdateUser({
  currentUser,
  errorOnAuthenticateUser,
  updateUser: updateUserPropFn,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState({
    email: null,
  });
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

  const setFormWithDefaultValues = () => {
    setForm({ email: currentUser.email });
  };

  useEffect(() => {
    setFormWithDefaultValues();
  }, []);

  useEffect(() => {
    if (errorOnAuthenticateUser) {
      setErrorMessage(UNEXPECTED_ERROR);
    }
  }, [errorOnAuthenticateUser]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { errorMessage: validationError } = validateForm(form);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    updateUserPropFn(currentUser.uuid, form).then(() => setIsSubmitComplete(true));
  };

  const updateFormValue = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      {!isSubmitComplete
      && (
        <Form
          updateFieldValue={updateFormValue}
          handleSubmit={handleSubmit}
          title={updateUserForm.title}
          formInputs={formInputs}
          errorMessage={errorMessage}
        />
      )}
      {isSubmitComplete
      && <Redirect to="/" />
      }
    </div>
  );
}

UpdateUser.defaultProps = {
  errorOnAuthenticateUser: null,
};

UpdateUser.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  errorOnAuthenticateUser: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
exports.validateForm = validateForm;
