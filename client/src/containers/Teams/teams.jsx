import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import {
  fetchTeamsByUser,
  fetchTeamsByDraft,
} from '../../actions';

import { teamsTable as teamsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { teamsFromUser, teamsFromDraft } = state.team;
  return { teamsFromUser, teamsFromDraft };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsByUser: id => dispatch(fetchTeamsByUser(id)),
  fetchTeamsByDraft: id => dispatch(fetchTeamsByDraft(id)),
});

const extractDataForDisplay = (teams, currentlySelectingTeamId) => (
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
      isCurrentlySelecting: currentlySelectingTeamId === uuid,
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
      teamsFromUser,
      teamsFromDraft,
      currentlySelectingTeamId,
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
      (teamsFromDraft || teamsFromUser) &&
        <div>
          {displayType === 'table' &&
            <Table
              type={type}
              title={title}
              columnHeaders={columnHeaders}
              data={extractDataForDisplay(teamsFromUser || teamsFromDraft)}
              emptyDataMessage={fetchBy === 'user' ? belongToNoTeams : noTeamsEntered}
              addNewLink={addNewLink}
            />
          }
          {displayType === 'selectionList' &&
            <SelectionList
              type={type}
              title={title}
              data={extractDataForDisplay(
                teamsFromUser || teamsFromDraft,
                currentlySelectingTeamId,
              )}
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
  userId: null,
  teamsFromUser: null,
  teamsFromDraft: null,
  currentlySelectingTeamId: null,
};

Teams.propTypes = {
  draftId: PropTypes.string,
  displayType: PropTypes.string.isRequired,
  fetchBy: PropTypes.string.isRequired,
  fetchTeamsByDraft: PropTypes.func.isRequired,
  fetchTeamsByUser: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  teamsFromUser: PropTypes.arrayOf(PropTypes.object),
  teamsFromDraft: PropTypes.arrayOf(PropTypes.object),
  currentlySelectingTeamId: PropTypes.string,
  userId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
