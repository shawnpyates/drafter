import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../components/Form/form.jsx';
import { authenticateUser, fetchCurrentUser } from '../../actions';
import { login as loginForm } from '../../../formConstants.json';

const { errorMessage } = loginForm;

const mapStateToProps = (state) => {
  const { authenticatedUser, errorOnAuthenticateUser } = state.user;
  return { authenticatedUser, errorOnAuthenticateUser };
};

const mapDispatchToProps = dispatch => ({
  authenticateUser: credentials => dispatch(authenticateUser(credentials)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
})

const validateEmail = email => (/\S+@\S+\.\S+/).test(email);

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      email: null,
      password: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticatedUser) {
      this.props.fetchCurrentUser();
      return;
    }
    if (nextProps.errorOnAuthenticateUser) {
      const { failure } = nextProps.errorOnAuthenticateUser.response.data;
      if (failure) {
        this.setState({ errorMessage: errorMessages[failure] });
      } else {
        this.setState({ errorMessage: errorMessages.unexpected })
      };
    }
  }

  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateEmail(this.state.email)) {
      this.setState({ errorMessage: errorMessages.invalidEmail });
      return;
    }
    const { email, password } = this.state;
    this.props.authenticateUser({ email, password });
  }



  render() {
    return (
      <Form
        updateFieldValue={this.updateFieldValue}
        handleSubmit={this.handleSubmit}
        title={loginForm.title}
        formInputs={loginForm.inputs}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

LogIn.defaultProps = {
  authenticatedUser: null,
  errorOnAuthenticateUser: null,
};

LogIn.propTypes = {
  authenticatedUser: PropTypes.objectOf(PropTypes.any),
  errorOnAuthenticateUser: PropTypes.objectOf(PropTypes.any),
  authenticateUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
