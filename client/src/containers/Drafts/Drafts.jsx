import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table } from '../../components';

import { fetchDraftsByUser } from '../../actions';

import { draftsTable as draftsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { drafts } = state.draft;
  return { drafts };
};

const mapDispatchToProps = dispatch => ({
  fetchDraftsByUser: id => dispatch(fetchDraftsByUser(id)),
});

const extractDataForDisplay = drafts => (
  drafts.map((draft) => {
    const {
      uuid,
      name,
      timeScheduled,
      User: owner,
    } = draft;
    const readableTime = (
      timeScheduled
        ? moment(timeScheduled).format('MMM D YYYY, h:mm a')
        : draftsTableTexts.unscheduled
    );
    return {
      uuid,
      name,
      readableTime,
      ownerName: `${owner.firstName} ${owner.lastName}`,
    };
  })
);

class Drafts extends Component {
  componentDidMount() {
    const { userId } = this.props;
    this.props.fetchDraftsByUser(userId);
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
            data={extractDataForDisplay(drafts)}
            emptyDataMessage={noneScheduled}
            addNewLink="/createDrafts"
          />
        }
      </div>
    );
  }
}

Drafts.defaultProps = {
  drafts: null,
  userId: null,
};

Drafts.propTypes = {
  drafts: PropTypes.arrayOf(PropTypes.object),
  fetchDraftsByUser: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
