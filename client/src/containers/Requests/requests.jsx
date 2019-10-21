import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Table } from '../../components';

import { createTeam } from '../../actions';

import requestsByFetchType from './requestsByFetchType';

const TABLE_OPTIONS = {
  ACCEPT: 'Accept',
  REJECT: 'Reject',
};

const mapDispatchToProps = dispatch => ({
  createTeam: body => dispatch(createTeam(body)),
});

const Requests = ({
  requests,
  fetchBy,
  createTeam: createTeamPropFn,
}) => {
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
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBy: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Requests);
