import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchDraftsByUser, fetchDraftsByTeam } from '../../actions';
import Table from '../../components/Table/table.jsx';
import { draftsTable as draftsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { drafts } = state.draft;
  return { drafts };
};

const mapDispatchToProps = dispatch => ({
  fetchDraftsByUser: id => dispatch(fetchDraftsByUser(id)),
  fetchDraftsByTeam: id => dispatch(fetchDraftsByTeam(id))
});

const extractDataForTable = drafts => (
  drafts.map((draft) => {
    const { name, timeScheduled, ownerName } = draft;
    const readableTime = timeScheduled ?
      moment(timeScheduled).format('MMM D YYYY, h:mm a') :
      draftsTableTexts.unscheduled;
    return { name, readableTime, ownerName };
  })
);

class Drafts extends Component {
  componentDidMount() {
    const { fetchBy, fetchDraftsByUser, fetchDraftsByTeam, userId, teamId } = this.props;
    fetchBy === 'user' ? fetchDraftsByUser(userId) : fetchDraftsByTeam(teamId);
  }

  render() {
    const { drafts } = this.props;
    const {
      type,
      title,
      noneScheduled,
      columnHeaders,
    } = draftsTableTexts;
    return (
      <div>
        {drafts &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(drafts)}
            emptyDataMessage={noneScheduled}
          />
        }
      </div>
    );
  }
}

Drafts.defaultProps = {
  ownDrafts: null,
};

Drafts.propTypes = {
  ownDrafts: PropTypes.arrayOf(PropTypes.object),
  fetchDraftsByUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
