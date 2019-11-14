import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import uuidv4 from 'uuid';

import { QuickCreateForm } from '../../components';

import { createPlayer } from '../../actions';

import { player as playerForm } from '../../formContent.json';

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
  currentUser,
  match,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [quickCreateForm, setQuickCreateForm] = useState([{ id: uuidv4() }]);

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
    const body = quickCreateForm.map(row => validateAndGetBody(row));
    // IDs are for UI rendering purposes only, remove before sending req
    const bodyWithIdsRemoved = body.map((row) => {
      const { id, ...rowWithIdRemoved } = row;
      return rowWithIdRemoved;
    });
    createPlayerPropFn(bodyWithIdsRemoved).then(() => setIsSubmitComplete(true));
  };
  const { inputs, title } = playerForm;

  return (
    <div>
      {!isSubmitComplete
      && (
        <QuickCreateForm
          updateFieldValue={updateFieldValue}
          handleSubmit={handleSubmit}
          title={title}
          formInputs={inputs}
          errorMessage={errorMessage}
          currentValues={quickCreateForm}
        />
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
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
exports.validateForm = validateForm;
