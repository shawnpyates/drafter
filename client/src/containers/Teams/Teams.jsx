import React from 'react';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { teamsTable as teamsTableTexts } from '../../../texts.json';

const extractDataForDisplay = (teams) => (
  teams.map((team) => {
    const {
      uuid,
      name,
      User: owner,
      Draft: draft,
      Players: players,
    } = team;
    const { currentlySelectingTeamId, name: draftName } = draft;
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
  fetchBy,
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
  const addNewLink = (
    (url && url.includes('/show'))
      ? url.replace('/show', '/createTeams')
      : '/createTeams'
  );
  return (
    teams 
    && (
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
    )
  );
};

Teams.defaultProps = {
  match: {},
};

Teams.propTypes = {
  displayType: PropTypes.string.isRequired,
  fetchBy: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Teams;
