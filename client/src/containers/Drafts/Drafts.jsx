import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table } from '../../components';

import { draftsTable as draftsTableTexts } from '../../texts.json';

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

const Drafts = ({ drafts }) => {
  const {
    type,
    title,
    noneScheduled,
    columnHeaders,
  } = draftsTableTexts;
  return (
    <div>
      {drafts
      && (
        <Table
          type={type}
          title={title}
          columnHeaders={columnHeaders}
          data={extractDataForDisplay(drafts)}
          emptyDataMessage={noneScheduled}
          addNewLink="/createDrafts"
        />
      )}
    </div>
  );
};

Drafts.propTypes = {
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Drafts;
