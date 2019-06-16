import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../components/Table/table';

import {
  createTeam,
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
  createTeam: body => dispatch(createTeam(body)),
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

  handleOptionClick = (e) => {
    const { fetchBy } = this.props;
    const requests = this.props[requestsByFetchType[fetchBy].data];
    const requestForTeam = requests.find(r => r.uuid === e.target.value);
    // TODO - only create team if 'Accept' is clicked, then delete request
    const {
      teamName,
      User: { uuid: ownerUserId },
      Draft: { uuid: draftId },
    } = requestForTeam;
    this.props.createTeam({
      name: teamName,
      ownerUserId,
      draftId,
    });
  };

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
      options,
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
            options={options}
            handleOptionClick={this.handleOptionClick}
          />
        }
      </div>
    );
  }
}

Requests.propTypes = {
  createTeam: PropTypes.func.isRequired,
  fetchBy: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
