import React from 'react';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { teamsTable as teamsTableTexts } from '../../../texts.json';

const DISPLAY_TYPES = {
  TABLE: 'table',
  SELECTION_LIST: 'selectionList',
};

const URL_NAMESPACES = {
  SHOW: '/show',
  CREATE_TEAMS: '/createTeams',
};

const extractDataForDisplay = (teams) => (
  teams.map((team) => {
    const {
      uuid,
      name,
      User: owner,
      Draft: draft,
      Players: players,
    } = team;
    const { currentlySelectingTeamId, name: draftName } = draft || {};
    return {
      uuid,
      name,
      draft: draftName,
      ownerName: `${owner.firstName} ${owner.lastName}`,
      players,
      isCurrentlySelecting: currentlySelectingTeamId === uuid,
    };
  })
);

const Teams = ({
  parent,
  displayType,
  match: { url },
  teams,
}) => {
  const {
    type,
    title,
    belongToNoTeams,
    noTeamsEntered,
    columnHeaders,
  } = teamsTableTexts;
  const { SHOW, CREATE_TEAMS } = URL_NAMESPACES
  const addNewLink = (
    (url && url.includes(SHOW))
      ? url.replace(SHOW, CREATE_TEAMS)
      : CREATE_TEAMS
  );
  return (
    teams 
    && (
      <div>
        {displayType === DISPLAY_TYPES.TABLE &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForDisplay(teams)}
            emptyDataMessage={parent === 'user' ? belongToNoTeams : noTeamsEntered}
            addNewLink={addNewLink}
          />
        }
        {displayType === DISPLAY_TYPES.SELECTION_LIST &&
          <SelectionList
            type={type}
            title={title}
            data={extractDataForDisplay(teams)}
            emptyDataMessage={noTeamsEntered}
          />
        }
      </div>
    )
  );
};

Teams.defaultProps = {
  match: {},
};

Teams.propTypes = {
  displayType: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Teams;
