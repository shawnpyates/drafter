import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { fetchPlayersByTeam, fetchPlayersByDraft, updatePlayer } from '../../actions';

import { playersTable as playersTableTexts, positions } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { players } = state.player;
  return { players };
};

const mapDispatchToProps = dispatch => ({
  fetchPlayersByTeam: id => dispatch(fetchPlayersByTeam(id)),
  fetchPlayersByDraft: id => dispatch(fetchPlayersByDraft(id)),
  updatePlayerPropFn: (id, body) => dispatch(updatePlayer({ id, body })),
});

const extractDataForDisplay = players => (
  players.map((player) => {
    const {
      uuid,
      name,
      email,
      position,
    } = player;
    return {
      uuid,
      name,
      email: email || '(Unprovided)',
      position,
    };
  })
);

class Players extends Component {
  componentDidMount() {
    const {
      fetchBy,
      fetchPlayersByTeam: fetchByTeam,
      fetchPlayersByDraft: fetchByDraft,
      teamId,
      draft,
    } = this.props;
    if (fetchBy === 'team') {
      fetchByTeam(teamId);
    } else {
      fetchByDraft(draft.uuid);
    }
  }

  assignPlayerToTeam = (playerId) => {
    const { draft, moveSelectionToNextTeam } = this.props;
    const { currentlySelectingTeamId } = draft;
    this.props.updatePlayerPropFn(
      playerId,
      { teamId: currentlySelectingTeamId },
    );
    moveSelectionToNextTeam();
  }

  render() {
    const {
      players,
      fetchBy,
      teamId,
      draft,
      displayType,
    } = this.props;
    const {
      type,
      title,
      noPlayersOnTeam,
      noPlayersInDraft,
      columnHeaders,
    } = playersTableTexts;
    const addNewLink = (
      fetchBy === 'team'
        ? `/teams/${teamId}/createPlayers`
        : `/drafts/${draft.uuid}/createPlayers`
    );
    return (
      players &&
        <div>
          {displayType === 'table' &&
            <Table
              type={type}
              title={title}
              columnHeaders={columnHeaders}
              data={extractDataForDisplay(players)}
              emptyDataMessage={fetchBy === 'team' ? noPlayersOnTeam : noPlayersInDraft}
              addNewLink={addNewLink}
            />
          }
          {displayType === 'selectionList' &&
            <SelectionList
              type={type}
              title={title}
              data={extractDataForDisplay(players)}
              emptyDataMessage={noPlayersInDraft}
              positions={positions}
              assignPlayerToTeam={this.assignPlayerToTeam}
            />
          }
        </div>
    );
  }
}

Players.defaultProps = {
  players: null,
  teamId: null,
  draft: null,
  moveSelectionToNextTeam: null,
};

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  displayType: PropTypes.string.isRequired,
  fetchBy: PropTypes.string.isRequired,
  fetchPlayersByTeam: PropTypes.func.isRequired,
  fetchPlayersByDraft: PropTypes.func.isRequired,
  updatePlayerPropFn: PropTypes.func.isRequired,
  teamId: PropTypes.string,
  draft: PropTypes.objectOf(PropTypes.any),
  moveSelectionToNextTeam: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
