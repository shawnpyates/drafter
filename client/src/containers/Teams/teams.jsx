import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';

import { fetchTeamsByUser, fetchTeamsByDraft } from '../../actions';

import { teamsTable as teamsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { teams } = state.team;
  const { drafts } = state.draft;
  return { teams, drafts };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsByUser: id => dispatch(fetchTeamsByUser(id)),
  fetchTeamsByDraft: id => dispatch(fetchTeamsByDraft(id)),
});

const extractDataForTable = (teams, drafts) => (
  teams.map((team) => {
    const { id, name, ownerName } = team;
    const draftName = drafts.find(draft => draft.id === team.draftId).name;
    return {
      id,
      name,
      draft: draftName,
      ownerName,
    };
  })
);

class Teams extends Component {
  componentDidMount() {
    const {
      fetchBy,
      userId,
      draftId,
    } = this.props;
    if (fetchBy === 'user') {
      this.props.fetchTeamsByUser(userId);
    } else {
      this.props.fetchTeamsByDraft(draftId);
    }
  }

  render() {
    const {
      teams,
      fetchBy,
      drafts,
      match: { url },
    } = this.props;
    const {
      type,
      title,
      belongToNoTeams,
      noTeamsEntered,
      columnHeaders,
    } = teamsTableTexts;
    const addNewLink = url && url.replace('/show', '/createTeams');
    return (
      <div>
        {teams &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(teams, drafts)}
            emptyDataMessage={fetchBy === 'user' ? belongToNoTeams : noTeamsEntered}
            addNewLink={addNewLink}
          />
        }
      </div>
    );
  }
}

Teams.defaultProps = {
  draftId: null,
  drafts: null,
  match: {},
  teams: null,
  userId: null,
};

Teams.propTypes = {
  draftId: PropTypes.number,
  drafts: PropTypes.arrayOf(PropTypes.object),
  fetchBy: PropTypes.string.isRequired,
  fetchTeamsByDraft: PropTypes.func.isRequired,
  fetchTeamsByUser: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  teams: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
