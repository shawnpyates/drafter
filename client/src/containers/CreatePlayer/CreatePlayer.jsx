import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import uuidv4 from 'uuid';

import { Form } from '../../components';

import { createPlayer } from '../../actions';

import { player as playerForm } from '../../formContent.json';
import QuickCreateForm from '../../components/Form/QuickCreateForm';

const {
  missingField,
  invalidEmail,
} = playerForm.errorMessages;

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = dispatch => ({
  createPlayer: body => dispatch(createPlayer(body)),
});

const isEmailValid = email => (/\S+@\S+\.\S+/).test(email);

const validateForm = ({ name, email, position }) => {
  if (!name || !position) {
    return { validationErrorMessage: missingField };
  }
  if (email && !isEmailValid(email)) {
    return { validationErrorMessage: invalidEmail };
  }
  return { success: true };
};

function CreatePlayer({
  createPlayer: createPlayerPropFn,
  createManyPlayers: createManyPlayersPropFn,
  currentUser,
  match,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState({
    name: null,
    email: null,
    position: null,
  });
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [quickCreateForm, setQuickCreateForm] = useState(null);

  const {
    url = '',
    params: { id: urlIdParam } = {},
  } = match;
  const urlTypeNamespace = url.split(urlIdParam)[0];

  const updateFieldValue = ({
    name,
    value,
    rowNumChangeVal,
    index,
  }) => {
    if (quickCreateForm) {
      if (rowNumChangeVal === 1) {
        setQuickCreateForm([...quickCreateForm, { id: uuidv4() }]);
      } else if (rowNumChangeVal === -1) {
        setQuickCreateForm([
          ...quickCreateForm.slice(0, index),
          ...quickCreateForm.slice(index + 1),
        ]);
      } else {
        const rowToChange = quickCreateForm[index];
        const updatedRow = { ...rowToChange, [name]: value };
        setQuickCreateForm([
          ...quickCreateForm.slice(0, index),
          updatedRow,
          ...quickCreateForm.slice(index + 1),
        ]);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateAndGetBody = (data) => {
    const { validationErrorMessage } = validateForm(data);
    const orgKey = urlTypeNamespace === '/teams/' ? 'teamId' : 'draftId';
    if (validationErrorMessage) {
      setErrorMessage(validationErrorMessage);
    }
    return {
      ...data,
      creatorUserId: currentUser.uuid,
      [orgKey]: urlIdParam,
    };
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (quickCreateForm) {
      const body = quickCreateForm.map(row => validateAndGetBody(row));
      alert(`body: ${JSON.stringify(body)}`);
      // createManyPlayersPropFn(body).then(() => setIsSubmitComplete(true));
    } else {
      const body = validateAndGetBody(form);
      createPlayerPropFn(body).then(() => setIsSubmitComplete(true));
    }
  };

  const toggleQuickCreateMode = (shouldRenderQuickCreateMode) => {
    if (shouldRenderQuickCreateMode) {
      setQuickCreateForm([{ id: uuidv4() }]);
    } else {
      setQuickCreateForm(null);
    }
  };

  const { inputs, title } = playerForm;

  return (
    <div>
      <button onClick={() => toggleQuickCreateMode(!quickCreateForm)}>
        {quickCreateForm ? 'Switch Back to Regular Mode' : 'Switch to Quick Create Mode'}
      </button>
      {!isSubmitComplete
      && (
        quickCreateForm
          ? (
            <QuickCreateForm
              updateFieldValue={updateFieldValue}
              handleSubmit={handleSubmit}
              title={title}
              formInputs={inputs}
              errorMessage={errorMessage}
              currentValues={quickCreateForm}
            />
          )
          : (
            <Form
              updateFieldValue={updateFieldValue}
              handleSubmit={handleSubmit}
              title={title}
              formInputs={inputs}
              errorMessage={errorMessage}
            />
          )

      )}
      {isSubmitComplete
      && <Redirect to={url.replace('/createPlayers', '/show')} />
      }
    </div>
  );
}

CreatePlayer.defaultProps = {
  match: {},
};

CreatePlayer.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  createManyPlayers: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
exports.validateForm = validateForm;
