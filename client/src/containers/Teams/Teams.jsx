import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectionList, Table } from '../../components';

import { teamsTable as teamsTableTexts } from '../../texts.json';

import { destroyTeam } from '../../actions';

const DISPLAY_TYPES = {
  TABLE: 'table',
  SELECTION_LIST: 'selectionList',
};

const URL_NAMESPACES = {
  SHOW: '/show',
  CREATE_TEAMS: '/createTeams',
  UPDATE_ORDER: '/reorderTeams',
};

const mapDispatchToProps = dispatch => ({
  destroyTeam: id => dispatch(destroyTeam(id)),
});

const extractDataForDisplay = teams => (
  teams.map((team) => {
    const {
      uuid,
      name,
      User: owner,
      selectionorder,
      Draft: draft,
      Players: players,
    } = team;
    const { currentlySelectingTeamId, name: draftName } = draft || {};
    return {
      uuid,
      name,
      draft: draftName,
      ownerName: owner && `${owner.firstName} ${owner.lastName}`,
      selectionorder,
      players,
      isCurrentlySelecting: currentlySelectingTeamId === uuid,
    };
  })
);

function Teams({
  parent,
  displayType,
  match: { url },
  teams,
  destroyTeam: destroyTeamPropFn,
}) {
  const {
    type,
    title,
    belongToNoTeams,
    noTeamsEntered,
    columnHeaders,
    options,
  } = teamsTableTexts;
  const { SHOW, CREATE_TEAMS, UPDATE_ORDER } = URL_NAMESPACES;
  const addNewLink = (
    (url && url.includes(SHOW))
      ? url.replace(SHOW, CREATE_TEAMS)
      : CREATE_TEAMS
  );
  const reorderTeamsLink = (
    parent === 'draft'
    && url.replace(SHOW, UPDATE_ORDER)
  );

  const handleDestroy = (ev) => {
    const { value } = ev.target;
    destroyTeamPropFn(value);
  };

  return (
    teams
    && (
      <div>
        {displayType === DISPLAY_TYPES.TABLE
        && (
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForDisplay(teams)}
            emptyDataMessage={parent === 'user' ? belongToNoTeams : noTeamsEntered}
            addNewLink={addNewLink}
            reorderTeamsLink={reorderTeamsLink}
            options={options}
            handleOptionClick={handleDestroy}
          />
        )}
        {displayType === DISPLAY_TYPES.SELECTION_LIST
        && (
          <SelectionList
            type={type}
            title={title}
            data={extractDataForDisplay(teams)}
            emptyDataMessage={noTeamsEntered}
          />
        )}
      </div>
    )
  );
}

Teams.defaultProps = {
  match: {},
};

Teams.propTypes = {
  destroyTeam: PropTypes.func.isRequired,
  displayType: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Teams);
