import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchDraftsByUser, createDraft, updateView } from '../../actions';
import Table from '../../components/Table/table.jsx';
import { draftsTable as draftsTableTexts } from '../../../texts.json';

const mapStateToProps = (state) => {
  const { ownDrafts } = state.draft;
  return { ownDrafts };
};

const mapDispatchToProps = dispatch => ({
  fetchDraftsByUser: id => dispatch(fetchDraftsByUser(id)),
  updateView: view => dispatch(updateView(view)),
});

const extractDataForTable = drafts => (
  drafts.map((draft) => {
    const { name, timeScheduled } = draft;
    return { name, timeScheduled };
  })
);

class Drafts extends Component {
  componentDidMount() {
    this.props.fetchDraftsByUser(this.props.userId);
  }

  openCreateDraftView = () => {
    this.props.updateView('createDraft');
  }

  render() {
    const { ownDrafts } = this.props;
    const { title, noneScheduled, columnHeaders } = draftsTableTexts;
    return (
      <div>
        {ownDrafts &&
          <Table
            title={title}
            columnHeaders={columnHeaders}
            data={extractDataForTable(ownDrafts)}
            emptyDataMessage={noneScheduled}
            addNew={this.openCreateDraftView}
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
  updateView: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
