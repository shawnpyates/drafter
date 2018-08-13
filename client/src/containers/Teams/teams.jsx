import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTeamsByUser, fetchTeamsByDraft } from '../../actions';
import Table from '../../components/Table/table.jsx';
import { teamsTable as teamsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { teams } = state.team;
  return { teams };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsByUser: id => dispatch(fetchTeamsByUser(id)),
  fetchTeamsByDraft: id => dispatch(fetchTeamsByDraft(id)),
});

const extractDataForTable = (teams, userId) => (
  teams.map((team) => {
    const { name, ownerName } = team;
    return { name, ownerName };
  })
);

class Teams extends Component {
  componentDidMount() {
    const { fetchBy, fetchTeamsByUser, fetchTeamsByDraft, userId, draftId } = this.props;
    fetchBy === 'user' ? fetchTeamsByUser(userId) : fetchTeamsByDraft(draftId);
  }

  render() {
    const { teams } = this.props;
    const {
      type,
      title,
      noTeams,
      columnHeaders,
    } = teamsTableTexts;
    return (
      <div>
        {teams &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(teams)}
            emptyDataMessage={noTeams}
          />
        }
      </div>
    );
  }
}

Teams.defaultProps = {
  teams: null,
  userId: null,
  draftId: null,
};

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object),
  fetchTeamsByUser: PropTypes.func.isRequired,
  fetchTeamsByDraft: PropTypes.func.isRequired,
  userId: PropTypes.number,
  draftId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
