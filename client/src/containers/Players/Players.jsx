import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { updatePlayer } from '../../actions';

import { playersTable as playersTableTexts, positions } from '../../../texts.json';

const mapDispatchToProps = dispatch => ({
  updatePlayerPropFn: (id, body, socket) => dispatch(updatePlayer({ id, body, socket })),
});

const extractDataForDisplay = players => (
  players
    .filter(player => !player.teamId)
    .map((player) => {
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
  assignPlayerToTeam = (playerId) => {
    const {
      draft,
      socket,
      updatePlayerPropFn,
    } = this.props;
    const { currentlySelectingTeamId } = draft;
    updatePlayerPropFn(
      playerId,
      { teamId: currentlySelectingTeamId },
      socket,
    );
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
  socket: null,
};

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  displayType: PropTypes.string.isRequired,
  fetchBy: PropTypes.string.isRequired,
  updatePlayerPropFn: PropTypes.func.isRequired,
  teamId: PropTypes.string,
  draft: PropTypes.objectOf(PropTypes.any),
  socket: PropTypes.objectOf(PropTypes.any),
};

export default connect(null, mapDispatchToProps)(Players);
