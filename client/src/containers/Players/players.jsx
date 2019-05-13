import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';

import { fetchUsersByTeam, fetchUsersByDraft } from '../../actions';

import { playersTable as playersTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { users: players } = state.user;
  return { players };
};

const mapDispatchToProps = dispatch => ({
  fetchUsersByTeam: id => dispatch(fetchUsersByTeam(id)),
  fetchUsersByDraft: id => dispatch(fetchUsersByDraft(id)),
});

const extractDataForTable = players => (
  players.map((player) => {
    const {
      id,
      firstName,
      lastName,
      position,
    } = player;
    const fullName = `${firstName} ${lastName}`;
    return { id, fullName, position };
  })
);

class Players extends Component {
  componentDidMount() {
    const {
      fetchBy,
      fetchUsersByTeam: fetchByTeam,
      fetchUsersByDraft: fetchByDraft,
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
  fetchUsersByTeam: PropTypes.func.isRequired,
  fetchUsersByDraft: PropTypes.func.isRequired,
  teamId: PropTypes.number,
  draftId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
