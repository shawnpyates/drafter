import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Table } from '../../components';

import {
  createTeam,
  destroyRequest,
  fetchCurrentUser,
  resetRequestState,
  resetTeamState,
} from '../../actions';

import requestsByFetchType from './requestsByFetchType';

const TABLE_OPTIONS = {
  ACCEPT: 'Accept',
  REJECT: 'Reject',
};

const mapStateToProps = (state) => ({
  isRequestDestroyed: state.request.destroyed,
  isTeamCreated: state.team.created,
});

const mapDispatchToProps = dispatch => ({
  createTeam: body => dispatch(createTeam(body)),
  destroyRequest: id => dispatch(destroyRequest(id)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  resetRequestState: () => dispatch(resetRequestState()),
  resetTeamState: () => dispatch(resetTeamState()),
});

const Requests = ({
  createTeam: createTeamPropFn,
  destroyRequest: destroyRequestPropFn,
  fetchBy,
  fetchCurrentUser: fetchCurrentUserPropFn,
  isRequestDestroyed,
  isTeamCreated,
  resetRequestState: resetRequestStatePropFn,
  resetTeamState: resetTeamStatePropFn,
  requests,
}) => {
  useEffect(() => {
    if (isTeamCreated) {
      resetTeamStatePropFn();
      fetchCurrentUserPropFn();
    } else if (isRequestDestroyed) {
      resetRequestStatePropFn();
      fetchCurrentUserPropFn();
    }
  }, [isRequestDestroyed, isTeamCreated]);

  const handleOptionClick = (ev) => {
    const { innerText, value } = ev.target;
    const requestForTeam = requests.find(request => request.uuid === value);
    const {
      teamName,
      User: { uuid: ownerUserId },
      Draft: { uuid: draftId },
      uuid: requestId,
    } = requestForTeam;
    if (innerText === TABLE_OPTIONS.ACCEPT) {
      createTeamPropFn({
        name: teamName,
        ownerUserId,
        draftId,
        requestId,
      });
    }
    if (innerText === TABLE_OPTIONS.REJECT) {
      destroyRequestPropFn(requestId);
    }
  };

  const requestProperties = requestsByFetchType[fetchBy];
  const { tableTexts, getDataForTable } = requestProperties;
  const {
    type,
    title,
    nonePending,
    columnHeaders,
    options,
  } = tableTexts;
  return (
    <div>
      {requests
      && (
        <Table
          type={type}
          title={title}
          columnHeaders={columnHeaders}
          data={getDataForTable(requests)}
          emptyDataMessage={nonePending}
          options={options}
          handleOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};

Requests.propTypes = {
  createTeam: PropTypes.func.isRequired,
  destroyRequest: PropTypes.func.isRequired,
  fetchBy: PropTypes.string.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  isRequestDestroyed: PropTypes.bool.isRequired,
  isTeamCreated: PropTypes.bool.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetRequestState: PropTypes.func.isRequired,
  resetTeamState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
