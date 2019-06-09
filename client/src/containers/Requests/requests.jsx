import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';

import {
  fetchRequestsByDraft,
  fetchRequestsByRequester,
  fetchRequestsByDraftOwner,
} from '../../actions';

import {
  incomingRequestsTable as incomingRequestsTableTexts,
  outgoingRequestsTable as outgoingRequestsTableTexts,
  requestsForDraftTable as requestsForDraftTableTexts,
} from '../../../texts.json';

const mapStateToProps = (state) => {
  const {
    requestsForDraft,
    ougtoingRequests,
    incomingRequests,
  } = state.request;
  return ({
    requests: requestsForDraft || ougtoingRequests || incomingRequests,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchByDraft: id => dispatch(fetchRequestsByDraft(id)),
  fetchByRequester: id => dispatch(fetchRequestsByRequester(id)),
  fetchByDraftOwner: id => dispatch(fetchRequestsByDraftOwner(id)),
});

const getTableTexts = (fetchBy) => {
  switch (fetchBy) {
    case 'draft':
      return requestsForDraftTableTexts;
    case 'requester':
      return outgoingRequestsTableTexts;
    case 'draftOwner':
      return incomingRequestsTableTexts;
    default:
      return null;
  }
};

const extractDataForTable = players => (
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
      userId,
      draftId,
      fetchByDraft,
      fetchByRequester,
      fetchByDraftOwner,
    } = this.props;
    switch (fetchBy) {
      case 'draft':
        fetchByDraft(draftId);
        break;
      case 'requester':
        fetchByRequester(userId);
        break;
      case 'draftOwner':
        fetchByDraftOwner(userId);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      requests,
      fetchBy,
    } = this.props;
    const {
      type,
      title,
      nonePending,
      columnHeaders,
    } = getTableTexts(fetchBy);
    return (
      <div>
        {requests &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(requests)}
            emptyDataMessage={nonePending}
          />
        }
      </div>
    );
  }
}

Players.defaultProps = {
  requests: null,
  userId: null,
  draftId: null,
};

Players.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object),
  fetchBy: PropTypes.string.isRequired,
  fetchByDraft: PropTypes.func.isRequired,
  fetchByRequester: PropTypes.func.isRequired,
  fetchByDraftOwner: PropTypes.func.isRequired,
  userId: PropTypes.string,
  draftId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
