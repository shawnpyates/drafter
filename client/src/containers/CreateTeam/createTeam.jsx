import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from '../../components/Form/form.jsx';
import { createTeam } from '../../actions';
import { team as teamForm } from '../../../formConstants.json';

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const mapDispatchToProps = dispatch => ({
  createTeam: body => dispatch(createTeam(body)),
});

class CreateTeam extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      isSubmitComplete: false,
      errorMessage: null,
    };
  }

  updateFieldValue = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name } = this.state;
    const body = {
      name,
      ownerUserId: this.props.currentUser.id,
    };
    this.props.createTeam(body).then(() => this.setState({ isSubmitComplete: true }));
  }


  render() {
    const { ownTeams } = this.props;
    const { errorMessage, isSubmitComplete } = this.state;
    return (
      <div>
        {!isSubmitComplete &&
          <Form
            updateFieldValue={this.updateFieldValue}
            handleSubmit={this.handleSubmit}
            title={teamForm.title}
            formInputs={teamForm.inputs}
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

CreateTeam.propTypes = {
  createTeam: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
