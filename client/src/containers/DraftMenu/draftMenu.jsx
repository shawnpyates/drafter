import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import ProfileCard from '../../components/ProfileCard/profileCard';
import { draft as draftProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import Players from '../Players/players';
import Teams from '../Teams/teams';
import Requests from '../Requests/requests';

import { fetchOneDraft, fetchCurrentUser, updateDraft } from '../../actions';

const { properties: profileProperties, values: profileValues } = draftProfileData;

const mapStateToProps = (state) => {
  const { currentDraft } = state.draft;
  const { currentUser } = state.user;
  return { currentDraft, currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOneDraftPropFn: () => dispatch(fetchOneDraft(id)),
    fetchCurrentUserPropFn: () => dispatch(fetchCurrentUser()),
    updateDraftPropFn: body => dispatch(updateDraft({ id, body })),
  };
};

class DraftMenu extends Component {
  componentDidMount() {
    const {
      fetchOneDraftPropFn,
      fetchCurrentUserPropFn,
      match: { params },
    } = this.props;
    fetchOneDraftPropFn(params.id);
    fetchCurrentUserPropFn();
  }
  componentDidUpdate() {
    const { currentDraft, updateDraftPropFn } = this.props;
    const now = new Date().toISOString();
    if (
      currentDraft
      && currentDraft.status === 'scheduled'
      && currentDraft.timeScheduled < now
    ) {
      updateDraftPropFn({ status: 'open' });
    }
  }
  render() {
    const { currentDraft, currentUser, match } = this.props;
    const {
      uuid,
      timeScheduled,
      name: profileCardTitle,
      User: owner,
    } = currentDraft || {};
    const ownerName = owner && `${owner.firstName} ${owner.lastName}`;
    const { scheduledFor, owner: ownerKey } = profileProperties;
    const { unscheduled } = profileValues;
    const readableTime = (
      timeScheduled
        ? moment(timeScheduled).format('MMM D YYYY, h:mm a')
        : unscheduled
    );
    const profileCardData = {
      [scheduledFor]: readableTime,
      [ownerKey]: ownerName,
    };
    const profileCardLinkForUpdating = `/updateDraft/${uuid}`;
    return (
      currentDraft &&
        <div>
          <ProfileCard
            title={profileCardTitle}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
          />
          {(currentDraft.status === 'scheduled' || currentDraft.status === 'open') &&
            <div>
              <Teams
                draftId={uuid}
                fetchBy="draft"
                match={match}
                displayType={currentDraft.status === 'scheduled' ? 'table' : 'selectionList'}
              />
              <Players
                draftId={uuid}
                fetchBy="draft"
                displayType={currentDraft.status === 'scheduled' ? 'table' : 'selectionList'}
              />
              {
                (
                  currentDraft.ownerUserId === currentUser.uuid
                  && currentDraft.status === 'scheduled'
                ) && <Requests draftId={uuid} fetchBy="draft" />
              }
            </div>
          }
          {currentDraft.status === 'closed' &&
            <div>Draft is now open!</div>
          }
        </div>
    );
  }
}

DraftMenu.defaultProps = {
  currentDraft: null,
  currentUser: null,
};

DraftMenu.propTypes = {
  currentDraft: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any),
  fetchCurrentUserPropFn: PropTypes.func.isRequired,
  fetchOneDraftPropFn: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDraftPropFn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
