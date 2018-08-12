import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTeamsByUser } from '../../actions';
import Table from '../../components/Table/table.jsx';
import { teamsTable as teamsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { ownTeams } = state.team;
  return { ownTeams };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsByUser: id => dispatch(fetchTeamsByUser(id)),
});

const extractDataForTable = (teams, userId) => (
  teams.map((team) => {
    const { name, ownerName } = team;
    //TODO - if (userId === team.ownerUserId) isOwner = true
    return { name, ownerName };
  })
);

class Teams extends Component {
  componentDidMount() {
    this.props.fetchTeamsByUser(this.props.userId);
  }

  render() {
    const { ownTeams } = this.props;
    const {
      type,
      title,
      noTeams,
      columnHeaders,
    } = teamsTableTexts;
    return (
      <div>
        {ownTeams &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(ownTeams)}
            emptyDataMessage={noTeams}
          />
        }
      </div>
    );
  }
}

Teams.defaultProps = {
  ownTeams: null,
};

Teams.propTypes = {
  ownTeams: PropTypes.arrayOf(PropTypes.object),
  fetchTeamsByUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
