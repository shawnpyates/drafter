import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import ioClient from 'socket.io-client';


import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { draft as draftProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import {
  Players,
  Requests,
  Teams,
} from '..';

import { Timer } from '../../components';

import { fetchOneDraft, fetchCurrentUser, updateDraft } from '../../actions';

const { SERVER_URL } = process.env;

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
  constructor() {
    super();
    this.socket = null;
  }
  componentDidMount() {
    const {
      fetchOneDraftPropFn,
      fetchCurrentUserPropFn,
      match: { params },
    } = this.props;
    fetchOneDraftPropFn(params.id);
    fetchCurrentUserPropFn();
    // TODO - listen for incoming data
    // this.socket = ioClient(SERVER_URL);
    // this.socket.on('shouldUpdate', (data) => {
    //   this.fetchUpdatedDraftData();
    // });
  }
  componentDidUpdate() {
    const { currentDraft, currentUser, updateDraftPropFn } = this.props;
    const now = new Date().toISOString();
    if (currentDraft) {
      const {
        status,
        timeScheduled,
        currentlySelectingTeamId,
        Teams: teams,
      } = currentDraft;
      if (status === 'scheduled' && timeScheduled < now) {
        updateDraftPropFn({ status: 'open' });
      } else if (
        status === 'open'
        && !currentlySelectingTeamId
        && currentUser.uuid === currentDraft.ownerUserId
        && (teams && teams.length)
      ) {
        updateDraftPropFn({ currentlySelectingTeamId: teams[0].uuid });
      }
    }
  }
  moveSelectionToNextTeam = () => {
    const { currentDraft, updateDraftPropFn } = this.props;
    const { Teams: teams, currentlySelectingTeamId } = currentDraft;
    const indexOfSelectingTeam = (
      teams.indexOf(teams.find(team => team.uuid === currentlySelectingTeamId))
    );
    const indexOfNextTeam = (
      indexOfSelectingTeam === teams.length - 1
        ? 0
        : indexOfSelectingTeam + 1
    );
    updateDraftPropFn({ currentlySelectingTeamId: teams[indexOfNextTeam].uuid });
  }
  fetchUpdatedDraftData() {

  }
  render() {
    const {
      currentDraft,
      currentUser,
      match,
    } = this.props;
    const {
      uuid,
      timeScheduled,
      name: profileCardTitle,
      status,
      User: owner,
      currentlySelectingTeamId,
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
    const displayType = status === 'scheduled' ? 'table' : 'selectionList';
    return (
      currentDraft &&
        <div>
          <ProfileCard
            title={profileCardTitle}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
          />
          {(status === 'scheduled' || status === 'open') &&
            <div>
              {status === 'open' && <Timer />}
              <Teams
                draftId={uuid}
                currentlySelectingTeamId={currentlySelectingTeamId}
                fetchBy="draft"
                match={match}
                displayType={displayType}
              />
              <Players
                draft={currentDraft}
                fetchBy="draft"
                displayType={displayType}
                moveSelectionToNextTeam={this.moveSelectionToNextTeam}
              />
              {
                (
                  currentDraft.ownerUserId === currentUser.uuid
                  && status === 'scheduled'
                ) && <Requests draftId={uuid} fetchBy="draft" />
              }
            </div>
          }
          {status === 'closed' &&
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
