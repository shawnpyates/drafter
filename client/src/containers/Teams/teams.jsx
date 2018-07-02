import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTeamsByUser } from '../../actions';
import Table from '../../components/Table/table.jsx';
import { teamTable as teamTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { ownTeams } = state.team;
  return { ownTeams };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsByUser: id => dispatch(fetchTeamsByUser(id)),
});

class Teams extends Component {
  componentDidMount() {
    this.props.fetchTeamsByUser(this.props.userId);
  }

  render() {
    const { ownTeams } = this.props;
    const {
      type,
      title,
      noTeams,
      columnHeaders,
    } = draftsTableTexts;
    return (
      <div>
        {ownTeams &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={ownTeams}
            emptyDataMessage={noTeams}
          />
        }
      </div>
    );
  }
}

Teams.defaultProps = {
  ownTeams: null,
};

Teams.propTypes = {
  ownTeams: PropTypes.arrayOf(PropTypes.object),
  fetchTeamsByUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
