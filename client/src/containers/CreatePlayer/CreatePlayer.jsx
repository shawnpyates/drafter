import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import uuidv4 from 'uuid';

import { QuickCreateForm } from '../../components';

import {
  createPlayer,
  fetchOnePlayer,
  removeCurrentPlayerFromState,
  updatePlayer,
} from '../../actions';

import { player as playerForm } from '../../formContent.json';

const {
  missingField,
  invalidEmail,
} = playerForm.errorMessages;

const mapStateToProps = state => ({
  currentPlayer: state.player.currentPlayer,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  createPlayer: body => dispatch(createPlayer(body)),
  fetchOnePlayer: id => dispatch(fetchOnePlayer(id)),
  removeCurrentPlayerFromState: () => dispatch(removeCurrentPlayerFromState()),
  updatePlayer: (id, body) => dispatch(updatePlayer({ id, body })),
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
  currentPlayer,
  currentUser,
  fetchOnePlayer: fetchOnePlayerPropFn,
  match,
  removeCurrentPlayerFromState: removeCurrentPlayerFromStatePropFn,
  updatePlayer: updatePlayerPropFn,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [quickCreateForm, setQuickCreateForm] = useState([{ id: uuidv4() }]);

  const {
    url = '',
    params: { id: urlIdParam } = {},
  } = match;
  const urlTypeNamespace = url.split(urlIdParam)[0];
  const isInUpdateMode = urlTypeNamespace === '/players/';

  useEffect(() => {
    if (!currentPlayer && isInUpdateMode) {
      fetchOnePlayerPropFn(urlIdParam);
    } else if (currentPlayer) {
      const { name, email, position } = currentPlayer;
      setQuickCreateForm([{
        ...quickCreateForm[0],
        name,
        email,
        position,
      }])
    }
  }, [currentPlayer])

  useEffect(() => (
    function cleanup() {
      removeCurrentPlayerFromStatePropFn();
    }
  ), [])

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

  // row IDs are for UI rendering purposes only, remove before sending req
  const removeIdFromRow = (row) => {
    const { id, ...rowWithIdRemoved } = row;
    return rowWithIdRemoved;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const body = quickCreateForm.map(row => validateAndGetBody(row));
    if (isInUpdateMode) {
      updatePlayerPropFn(urlIdParam, removeIdFromRow(quickCreateForm[0]))
        .then(() => setIsSubmitComplete(true));
    } else {
      const bodyWithIdsRemoved = body.map((row) => removeIdFromRow(row));
      createPlayerPropFn(bodyWithIdsRemoved).then(() => setIsSubmitComplete(true));
    }
  };
  const { inputs, titleForCreateNew, titleForUpdate } = playerForm;

  return (
    <div>
      {!isSubmitComplete
      && (
        <QuickCreateForm
          updateFieldValue={updateFieldValue}
          handleSubmit={handleSubmit}
          title={isInUpdateMode ? titleForUpdate : titleForCreateNew}
          formInputs={inputs}
          errorMessage={errorMessage}
          currentValues={quickCreateForm}
          shouldDisplayAddRowButton={!isInUpdateMode}
          isWide
        />
      )}
      {isSubmitComplete
      && (
        <Redirect to={url.replace((isInUpdateMode ? '/update' : '/createPlayers'), '/show')}/>
      )}
    </div>
  );
}

CreatePlayer.defaultProps = {
  currentPlayer: null,
  match: {},
};

CreatePlayer.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  currentPlayer: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchOnePlayer: PropTypes.func.isRequired,
  removeCurrentPlayerFromState: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
exports.validateForm = validateForm;
