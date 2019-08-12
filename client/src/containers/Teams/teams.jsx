import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';
import SelectionList from '../../components/SelectionList/selectionList';

import {
  fetchTeamsByUser,
  fetchTeamsByDraft,
} from '../../actions';

import { teamsTable as teamsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { teams } = state.team;
  return { teams };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsByUser: id => dispatch(fetchTeamsByUser(id)),
  fetchTeamsByDraft: id => dispatch(fetchTeamsByDraft(id)),
});

const extractDataForDisplay = teams => (
  teams.map((team) => {
    const {
      uuid,
      name,
      User: owner,
      Draft: draft,
      Players: players,
    } = team;
    return {
      uuid,
      name,
      draft: draft.name,
      ownerName: `${owner.firstName} ${owner.lastName}`,
      players,
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
      match: { url },
      displayType,
    } = this.props;
    const {
      type,
      title,
      belongToNoTeams,
      noTeamsEntered,
      columnHeaders,
    } = teamsTableTexts;
    const addNewLink = (
      (url && url.includes('/show'))
        ? url.replace('/show', '/createTeams')
        : '/createTeams'
    );
    return (
      teams &&
        <div>
          {displayType === 'table' &&
            <Table
              type={type}
              title={title}
              columnHeaders={columnHeaders}
              data={extractDataForDisplay(teams)}
              emptyDataMessage={fetchBy === 'user' ? belongToNoTeams : noTeamsEntered}
              addNewLink={addNewLink}
            />
          }
          {displayType === 'selectionList' &&
            <SelectionList
              type={type}
              title={title}
              data={extractDataForDisplay(teams)}
              emptyDataMessage={noTeamsEntered}
            />
          }
        </div>
    );
  }
}

Teams.defaultProps = {
  draftId: null,
  match: {},
  teams: null,
  userId: null,
};

Teams.propTypes = {
  draftId: PropTypes.string,
  displayType: PropTypes.string.isRequired,
  fetchBy: PropTypes.string.isRequired,
  fetchTeamsByDraft: PropTypes.func.isRequired,
  fetchTeamsByUser: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  teams: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
