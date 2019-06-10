import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';

import {
  fetchRequestsByDraft,
  fetchRequestsByRequester,
  fetchRequestsByDraftOwner,
} from '../../actions';

import requestsByFetchType from './requestsByFetchType';

const mapStateToProps = (state) => {
  const {
    requestsForDraft,
    outgoingRequests,
    incomingRequests,
  } = state.request;
  return ({ requestsForDraft, outgoingRequests, incomingRequests });
};

const mapDispatchToProps = dispatch => ({
  fetchByDraft: id => dispatch(fetchRequestsByDraft(id)),
  fetchByRequester: id => dispatch(fetchRequestsByRequester(id)),
  fetchByDraftOwner: id => dispatch(fetchRequestsByDraftOwner(id)),
});

class Requests extends Component {
  componentDidMount() {
    const { fetchBy } = this.props;
    const requestProperties = requestsByFetchType[fetchBy];
    this.props[requestProperties.fetchFn](this.props[requestProperties.fetchFnArg]);
  }

  render() {
    const { fetchBy } = this.props;
    const requestProperties = requestsByFetchType[fetchBy];
    const { data, tableTexts, getDataForTable } = requestProperties;
    const requestsToRender = this.props[data];
    const {
      type,
      title,
      nonePending,
      columnHeaders,
    } = tableTexts;
    return (
      <div>
        {requestsToRender &&
          <Table
            type={type}
            title={title}
            columnHeaders={columnHeaders}
            data={getDataForTable(requestsToRender)}
            emptyDataMessage={nonePending}
          />
        }
      </div>
    );
  }
}

Requests.propTypes = {
  fetchBy: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
