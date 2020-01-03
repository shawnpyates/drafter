import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { Table } from '../../components';

import { draftsTable as draftsTableTexts } from '../../texts.json';

import { destroyDraft } from '../../actions';

const mapDispatchToProps = dispatch => ({
  destroyDraft: id => dispatch(destroyDraft(id)),
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
        ? dayjs(timeScheduled).format('MMM D YYYY, h:mm a')
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

function Drafts({
  drafts,
  destroyDraft: destroyDraftPropFn,
}) {
  const {
    type,
    title,
    noneScheduled,
    columnHeaders,
    options,
  } = draftsTableTexts;

  const handleDestroy = (ev) => {
    const { value } = ev.target;
    destroyDraftPropFn(value);
  };

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
          options={options}
          handleOptionClick={handleDestroy}
        />
      )}
    </div>
  );
}

Drafts.propTypes = {
  destroyDraft: PropTypes.func.isRequired,
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Drafts);
