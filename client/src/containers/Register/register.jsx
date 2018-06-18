import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../components/Form/form.jsx';
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

const mapDipatchToProps = dispatch => ({
  createUser: body => dispatch(createUser(body)),
});

const validateEmail = email => (/\S+@\S+\.\S+/).test(email);

const getFieldByName = (inputs, name) => inputs.find(input => input.name === name);

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
      registeredAsPlayer: null,
      position: null,
      formInputs: [...formInputs],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorOnAuthenticateUser) {
      this.setState({ errorMessage: unexpected });
    }
  }

  updateObjectInInputs = (inputs, shouldBeEnabled) => {
    const positionField = getFieldByName(formInputs, 'position');
    const updatedPosition = { ...positionField, enabled: shouldBeEnabled };
    return inputs.map(input => input.name === 'position' ? updatedPosition : input)
  };

  updatePositionFieldBasedOnRegisterState() {
    const isRegistered = this.state.registeredAsPlayer === 'Yes';
    const { formInputs } = this.state;
    this.setState({ formInputs: this.updateObjectInInputs(formInputs, isRegistered) });
    if (!isRegistered) this.setState({ position: null });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.doesFormHaveError()) return;
    const {
      firstName,
      lastName,
      email,
      passwordFirstInsertion,
      registeredAsPlayer,
      position,
    } = this.state;
    const isRegistered = registeredAsPlayer === 'Yes';
    const body = {
      firstName,
      lastName,
      email,
      password: passwordFirstInsertion,
      registeredAsPlayer: isRegistered,
      position,
    };
    positionField.enabled = false;
    this.props.createUser(body);
  }

  doesFormHaveError() {
    const keys = Object.keys(this.state);
    const values = Object.values(this.state);
    const {
      registeredAsPlayer,
      passwordFirstInsertion,
      passwordSecondInsertion,
      email,
    } = this.state;
    for (let i = 0; i < keys.length; i += 1) {
      if ((!values[i] && keys[i] !== 'errorMessage') &&
          !(keys[i] === 'position' && registeredAsPlayer === 'No')) {
        this.setState({ errorMessage: missingField });
        return true;
      }
    }
    if (passwordFirstInsertion !== passwordSecondInsertion) {
      this.setState({ errorMessage: passwordsDidNotMatch });
      return true;
    }
    if (passwordFirstInsertion.length < registerForm.passwordMinimumLength) {
      this.setState({ errorMessage: tooShort });
      return true;
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
    const { formInputs, errorMessage } = this.state;
    return (
      <Form
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

export default connect(mapStateToProps, mapDipatchToProps)(Register);
