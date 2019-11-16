import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Form } from '../../components';

import { updateUser, clearStateExceptUser } from '../../actions';

import { updateUser as updateUserForm } from '../../formContent.json';

import {
  TabList,
  TabListItem,
} from './styledComponents';

const {
  email: updateEmailForm,
  password: updatePasswordForm,
} = updateUserForm;

const {
  missingField: MISSING_FIELD,
  invalidEmail: INVALID_EMAIL,
  unexpected: UNEXPECTED_ERROR,
} = updateEmailForm.errorMessages;

const {
  incorrectPassword: INCORRECT_PASSWORD,
  oldAndNewSame: OLD_AND_NEW_SAME,
  passwordsDidNotMatch: PASSWORDS_DID_NOT_MATCH,
  tooShort: TOO_SHORT,
} = updatePasswordForm.errorMessages;

const ERROR_MESSAGE_DURATION = 2000;

const mapStateToProps = (state) => {
  const { currentUser, errorOnUpdateCurrentUser, updated: currentUserUpdated } = state.user;
  return { currentUser, errorOnUpdateCurrentUser, currentUserUpdated };
};

const mapDispatchToProps = dispatch => ({
  updateUser: (id, body) => dispatch(updateUser(id, body)),
  clearStateExceptUser: () => dispatch(clearStateExceptUser()),
});

const isEmailValid = email => (/\S+@\S+\.\S+/).test(email);

const validateForm = (form) => {
  const {
    email,
    oldPassword,
    newPasswordFirstInsertion,
    newPasswordSecondInsertion,
  } = form;
  if (Object.values(form).some(value => !value)) {
    return { errorMessage: MISSING_FIELD };
  }

  if (email && !isEmailValid(email)) {
    return { errorMessage: INVALID_EMAIL };
  }

  if (newPasswordFirstInsertion !== newPasswordSecondInsertion) {
    return { errorMessage: PASSWORDS_DID_NOT_MATCH };
  }

  if (oldPassword === newPasswordFirstInsertion) {
    return { errorMessage: OLD_AND_NEW_SAME };
  }

  if (
    newPasswordFirstInsertion
    && newPasswordFirstInsertion.length < updatePasswordForm.passwordMinimumLength
  ) {
    return { errorMessage: TOO_SHORT };
  }

  return { success: true };
};

function UpdateUser({
  currentUser,
  currentUserUpdated,
  errorOnUpdateCurrentUser,
  updateUser: updateUserPropFn,
  clearStateExceptUser: clearStateExceptUserPropFn,
}) {
  const [isUpdateEmailActiveForm, toggleActiveForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailForm, setEmailForm] = useState({
    email: currentUser.email,
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: null,
    newPasswordFirstInsertion: null,
    newPasswordSecondInsertion: null,
  });

  useEffect(() => {
    const {
      response: {
        data: { failure } = {},
      } = {},
    } = errorOnUpdateCurrentUser || {};
    if (failure && failure === 'incorrectPassword') {
      setErrorMessage(INCORRECT_PASSWORD);
    } else if (errorOnUpdateCurrentUser) {
      setErrorMessage(UNEXPECTED_ERROR);
    }
  }, [errorOnUpdateCurrentUser]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, ERROR_MESSAGE_DURATION);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, ERROR_MESSAGE_DURATION);
    }
  }, [errorMessage]);

  useEffect(() => (
    function cleanup() {
      clearStateExceptUserPropFn();
    }
  ));

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const activeForm = isUpdateEmailActiveForm ? emailForm : passwordForm;
    const { errorMessage: validationError } = validateForm(activeForm);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    updateUserPropFn(currentUser.uuid, activeForm);
  };

  const updateFormValue = ({ name, value }) => {
    if (isUpdateEmailActiveForm) {
      setEmailForm({ ...emailForm, [name]: value });
    } else {
      setPasswordForm({ ...passwordForm, [name]: value });
    }
  };

  const {
    title,
    inputs: formInputs,
  } = isUpdateEmailActiveForm ? updateEmailForm : updatePasswordForm;

  return (
    <div>
      {!currentUserUpdated
      && (
        <div>
          <TabList>
            <li>
              <TabListItem
                isLeft
                onClick={() => toggleActiveForm(true)}
              >
                {updateEmailForm.title}
              </TabListItem>
            </li>
            <li>
              <TabListItem
                onClick={() => toggleActiveForm(false)}
              >
                {updatePasswordForm.title}
              </TabListItem>
            </li>
          </TabList>
          <Form
            updateFieldValue={updateFormValue}
            handleSubmit={handleSubmit}
            title={title}
            formInputs={formInputs}
            errorMessage={errorMessage}
          />
        </div>
      )}
      {currentUserUpdated
      && <Redirect to="/" />
      }
    </div>
  );
}

UpdateUser.defaultProps = {
  errorOnUpdateCurrentUser: null,
};

UpdateUser.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  currentUserUpdated: PropTypes.bool.isRequired,
  errorOnUpdateCurrentUser: PropTypes.objectOf(PropTypes.any),
  updateUser: PropTypes.func.isRequired,
  clearStateExceptUser: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
exports.validateForm = validateForm;
