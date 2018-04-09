import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../components/Form/form.jsx';
import { fetchCurrentUser, createUser } from '../../actions';
import { register as registerForm } from '../../../formConstants.json';

const {
  missingField,
  passwordsDidNotMatch,
  tooShort,
  invalidEmail,
  unexpected,
} = registerForm.errorMessages;

const mapStateToProps = (state) => {
  const { authenticatedUser, errorOnAuthenticateUser } = state.user;
  return { authenticatedUser, errorOnAuthenticateUser };
};

const mapDipatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  createUser: body => dispatch(createUser(body)),
});

const validateEmail = email => (/\S+@\S+\.\S+/).test(email);

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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticatedUser) {
      this.props.fetchCurrentUser();
    }
    if (nextProps.errorOnAuthenticateUser) {
      this.setState({ errorMessage: unexpected });
    }
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
    const isRegisterNullified = (name === 'registeredAsPlayer' && value === 'No');
    if (isRegisterNullified) this.setState({ position: null });
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Form
        updateFieldValue={this.updateFieldValue}
        handleSubmit={this.handleSubmit}
        title={registerForm.title}
        formInputs={registerForm.inputs}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

Register.defaultProps = {
  authenticatedUser: null,
  errorOnAuthenticateUser: null,
};

Register.propTypes = {
  authenticatedUser: PropTypes.objectOf(PropTypes.any),
  errorOnAuthenticateUser: PropTypes.objectOf(PropTypes.any),
  fetchCurrentUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDipatchToProps)(Register);
