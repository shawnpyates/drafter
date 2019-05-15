import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';

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

const extractDataForTable = players => (
  players.map((player) => {
    const {
      id,
      name,
      position,
    } = player;
    return { id, name, position };
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
      <div>
        {players &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(players)}
            emptyDataMessage={fetchBy === 'team' ? noPlayersOnTeam : noPlayersInDraft}
            addNewLink={addNewLink}
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
  fetchBy: PropTypes.string.isRequired,
  fetchPlayersByTeam: PropTypes.func.isRequired,
  fetchPlayersByDraft: PropTypes.func.isRequired,
  teamId: PropTypes.number,
  draftId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
