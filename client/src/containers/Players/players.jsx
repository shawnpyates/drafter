import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';
import SelectionList from '../../components/SelectionList/selectionList';

import { fetchPlayersByTeam, fetchPlayersByDraft } from '../../actions';

import { playersTable as playersTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { players } = state.player;
  return { players };
};

const mapDispatchToProps = dispatch => ({
  fetchPlayersByTeam: id => dispatch(fetchPlayersByTeam(id)),
  fetchPlayersByDraft: id => dispatch(fetchPlayersByDraft(id)),
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
      draftId,
    } = this.props;
    if (fetchBy === 'team') {
      fetchByTeam(teamId);
    } else {
      fetchByDraft(draftId);
    }
  }

  render() {
    const {
      players,
      fetchBy,
      teamId,
      draftId,
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
        : `/drafts/${draftId}/createPlayers`
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
            />
          }
        </div>
    );
  }
}

Players.defaultProps = {
  players: null,
  teamId: null,
  draftId: null,
};

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  displayType: PropTypes.string.isRequired,
  fetchBy: PropTypes.string.isRequired,
  fetchPlayersByTeam: PropTypes.func.isRequired,
  fetchPlayersByDraft: PropTypes.func.isRequired,
  teamId: PropTypes.string,
  draftId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
