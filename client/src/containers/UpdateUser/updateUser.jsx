import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from '../../components/Form/form.jsx';
import { updateUser } from '../../actions';
import { updateUser as updateUserForm } from '../../../formConstants.json';
const { inputs: formInputs } = updateUserForm;

const {
  missingField,
  invalidEmail,
  unexpected,
} = updateUserForm.errorMessages;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const mapDispatchToProps = dispatch => ({
  updateUser: body => dispatch(updateUser(body)),
});

const validateEmail = email => (/\S+@\S+\.\S+/).test(email);

const getFieldByName = (inputs, name) => inputs.find(input => input.name === name);

class UpdateUser extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      email: null,
      registeredAsPlayer: null,
      position: null,
      inputs: null,
      isSubmitComplete: false,
    };
  }

  componentDidMount() {
    this.createInputsAndSetStateWithDefaultValues();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorOnAuthenticateUser) {
      this.setState({ errorMessage: unexpected });
    }
  }

  createInputsAndSetStateWithDefaultValues = () => {
    const { currentUser } = this.props;
    const registeredAsPlayer = currentUser.registeredAsPlayer ? 'Yes' : 'No';
    this.setState({
      inputs: formInputs.map(input => (
        {...input, defaultValue: currentUser[input.name]}
      )),
      email: currentUser.email,
      position: currentUser.position,
    }, () => this.updateFieldValue('registeredAsPlayer', registeredAsPlayer));
  }

  updateObjectInInputs = (inputs, shouldBeEnabled) => {
    const positionField = getFieldByName(inputs, 'position');
    const updatedPosition = { ...positionField, enabled: shouldBeEnabled };
    return inputs.map(input => input.name === 'position' ? updatedPosition : input)
  }

  updatePositionFieldBasedOnRegisterState() {
    const isRegistered = this.state.registeredAsPlayer === 'Yes';
    const { inputs } = this.state;
    this.setState({ inputs: this.updateObjectInInputs(inputs, isRegistered) });
    if (!isRegistered) this.setState({ position: null });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.doesFormHaveError()) return;
    const {
      email,
      registeredAsPlayer,
      position,
    } = this.state;
    const isRegistered = registeredAsPlayer === 'Yes';
    const body = {
      id: this.props.currentUser.id,
      email,
      registeredAsPlayer: isRegistered,
      position,
    };
    this.props.updateUser(body).then(() => this.setState({ isSubmitComplete: true }));
  }

  doesFormHaveError() {
    const keys = Object.keys(this.state);
    const values = Object.values(this.state);
    const {
      registeredAsPlayer,
      email,
    } = this.state;
    for (let i = 0; i < keys.length; i += 1) {
      if ((!values[i] && keys[i] !== 'errorMessage' && keys[i] !== 'isSubmitComplete') &&
          !(keys[i] === 'position' && registeredAsPlayer === 'No')) {
        this.setState({ errorMessage: missingField });
        return true;
      }
    }
    if (!validateEmail(email)) {
      this.setState({ errorMessage: invalidEmail });
      return true;
    }
    return false;
  }

  updateFieldValue = (name, value) => {
    this.setState({
      [name]: value
    }, () => {
      if (name === 'registeredAsPlayer') {
        this.updatePositionFieldBasedOnRegisterState();
      }
    });
  }

  render() {
    const { errorMessage, inputs, isSubmitComplete } = this.state;
    return (
      <div>
        {(!isSubmitComplete && inputs) &&
          <Form
            updateFieldValue={this.updateFieldValue}
            handleSubmit={this.handleSubmit}
            title={updateUserForm.title}
            formInputs={inputs}
            errorMessage={errorMessage}
          />
        }
        {isSubmitComplete &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

UpdateUser.propTypes = {
  updateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);