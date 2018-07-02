import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchDraftsByUser } from '../../actions';
import Table from '../../components/Table/table.jsx';
import { draftsTable as draftsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { ownDrafts } = state.draft;
  return { ownDrafts };
};

const mapDispatchToProps = dispatch => ({
  fetchDraftsByUser: id => dispatch(fetchDraftsByUser(id)),
});

const extractDataForTable = drafts => (
  drafts.map((draft) => {
    const { name, timeScheduled } = draft;
    const readableTime = timeScheduled ?
      moment(timeScheduled).format('MMM D YYYY, h:mm a') :
      draftsTableTexts.unscheduled;
    return { name, readableTime };
  })
);

class Drafts extends Component {
  componentDidMount() {
    this.props.fetchDraftsByUser(this.props.userId);
  }

  render() {
    const { ownDrafts } = this.props;
    const {
      type,
      title,
      noneScheduled,
      columnHeaders,
    } = draftsTableTexts;
    return (
      <div>
        {ownDrafts &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(ownDrafts)}
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
