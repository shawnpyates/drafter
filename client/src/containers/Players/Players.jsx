import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { playersTable as playersTableTexts } from '../../../texts.json';

const mapStateToProps = state => ({ shouldDraftViewBlur: state.draft.shouldDraftViewBlur });

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

const Players = ({
  players,
  parent,
  teamId,
  draft,
  displayType,
  assignPlayerToTeam,
  shouldDraftViewBlur,
}) => {
  const {
    type,
    title,
    noPlayersOnTeam,
    noPlayersInDraft,
    columnHeaders,
  } = playersTableTexts;
  const addNewLink = (
    parent === 'team'
      ? `/teams/${teamId}/createPlayers`
      : `/drafts/${draft.uuid}/createPlayers`
  );
  const nonSelectedPlayers = (
    parent === 'draft'
    && players.filter(player => !player.teamId)
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
            emptyDataMessage={parent === 'team' ? noPlayersOnTeam : noPlayersInDraft}
            addNewLink={addNewLink}
          />
        }
        {displayType === 'selectionList' &&
          <SelectionList
            type={type}
            title={title}
            data={extractDataForDisplay(nonSelectedPlayers || players)}
            emptyDataMessage={noPlayersInDraft}
            assignPlayerToTeam={assignPlayerToTeam}
            shouldDraftViewBlur={shouldDraftViewBlur}
          />
        }
      </div>
  );
}

Players.defaultProps = {
  players: null,
  teamId: null,
  draft: null,
  displayType: 'table',
};

Players.propTypes = {
  assignPlayerToTeam: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.object),
  displayType: PropTypes.string,
  parent: PropTypes.string.isRequired,
  teamId: PropTypes.string,
  draft: PropTypes.objectOf(PropTypes.any),
  shouldDraftViewBlur: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Players);
