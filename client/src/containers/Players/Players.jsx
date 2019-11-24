import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { playersTable as playersTableTexts } from '../../texts.json';

const DISPLAY_TYPES = {
  TABLE: 'table',
  SELECTION_LIST: 'selectionList',
};

const {
  type: TYPE,
  title: TITLE,
  noPlayersOnTeam: NO_PLAYERS_ON_TEAM,
  noPlayersInDraft: NO_PLAYERS_IN_DRAFT,
  emailUnprovided: EMAIL_UNPROVIDED,
  columnHeaders: COLUMN_HEADERS,
} = playersTableTexts;

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
      email: email || EMAIL_UNPROVIDED,
      position,
    };
  })
);

function Players({
  players,
  parent,
  teamId,
  draft,
  displayType,
  assignPlayerToTeam,
  shouldDraftViewBlur,
}) {
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
    players
    && (
      <div>
        {displayType === DISPLAY_TYPES.TABLE
        && (
          <Table
            type={TYPE}
            title={TITLE}
            columnHeaders={COLUMN_HEADERS}
            data={extractDataForDisplay(players)}
            emptyDataMessage={parent === 'team' ? NO_PLAYERS_ON_TEAM : NO_PLAYERS_IN_DRAFT}
            addNewLink={addNewLink}
          />
        )}
        {displayType === DISPLAY_TYPES.SELECTION_LIST
        && (
          <SelectionList
            type={TYPE}
            title={TITLE}
            data={extractDataForDisplay(nonSelectedPlayers || players)}
            emptyDataMessage={NO_PLAYERS_IN_DRAFT}
            assignPlayerToTeam={assignPlayerToTeam}
            shouldDraftViewBlur={shouldDraftViewBlur}
          />
        )}
      </div>
    )
  );
}

Players.defaultProps = {
  assignPlayerToTeam: null,
  players: null,
  teamId: null,
  draft: null,
  displayType: 'table',
};

Players.propTypes = {
  assignPlayerToTeam: PropTypes.func,
  players: PropTypes.arrayOf(PropTypes.object),
  displayType: PropTypes.string,
  parent: PropTypes.string.isRequired,
  teamId: PropTypes.string,
  draft: PropTypes.objectOf(PropTypes.any),
  shouldDraftViewBlur: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Players);
