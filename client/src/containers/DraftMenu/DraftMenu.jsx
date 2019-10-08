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

import { Button, Timer } from '../../components';

import {
  fetchOneDraft,
  fetchCurrentUser,
  updateDraft,
} from '../../actions';

const { properties: profileProperties, values: profileValues } = draftProfileData;

const START_DRAFT_INDICATOR_DURATION = 3000;

const mapStateToProps = (state) => {
  const { currentDraft } = state.draft;
  const { currentUser } = state.user;
  const { socket } = state.socket;
  return { currentDraft, currentUser, socket };
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
    this.state = {
      shouldOpenButtonRender: false,
      shouldStartDraftIndicatorRender: false,
      isUserFetchComplete: false,
    };
  }

  componentDidMount() {
    const {
      fetchOneDraftPropFn,
      fetchCurrentUserPropFn,
    } = this.props;
    fetchOneDraftPropFn();
    fetchCurrentUserPropFn();
  }

  componentDidUpdate() {
    const {
      currentDraft,
      currentUser,
      updateDraftPropFn,
      socket,
    } = this.props;
    if (currentDraft) {
      const now = new Date().toISOString();
      const {
        status,
        timeScheduled,
        currentlySelectingTeamId,
        Teams: teams,
      } = currentDraft;
      if (status === 'scheduled' && timeScheduled < now) {
        this.renderOpenButtonForOwner();
      } else if (
        status === 'open'
        && !currentlySelectingTeamId
        && currentUser.uuid === currentDraft.ownerUserId
        && (teams && teams.length)
      ) {
        updateDraftPropFn({ currentlySelectingTeamId: teams[0].uuid });
      }
    }
    if (!this.state.isUserFetchComplete && currentUser) {
      this.listenForSocketEvents(socket);
    }
  }

  listenForSocketEvents = (socket) => {
    const { uuid: currentDraftId } = this.props.currentDraft || {};
    socket.on('broadcastDraftSelection', (draftId) => {
      if (currentDraftId === draftId) {
        fetchOneDraftPropFn();
      }
    });
    socket.on('broadcastDraftStart', (draftId) => {
      if (currentDraftId === draftId) {
        this.setState({
          shouldOpenButtonRender: false,
          shouldStartDraftIndicatorRender: true,
        });
        setTimeout(() => {
          this.setState({ shouldStartDraftIndicatorRender: false });
        }, START_DRAFT_INDICATOR_DURATION);
      }
    });
  }

  openDraft = () => {
    this.props.updateDraftPropFn({ status: 'open' });
    this.props.socket.emit('draftStarted', this.props.currentDraft.uuid);
  }

  renderOpenButtonForOwner = () => {
    const { currentDraft, currentUser } = this.props;
    if (currentDraft.ownerUserId === currentUser.uuid && !this.state.shouldOpenButtonRender) {
      this.setState({ shouldOpenButtonRender: true });
    }
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
      Players: players,
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
              {(this.state.shouldOpenButtonRender && status !== 'open') &&
                <div>
                  <Button
                    value="OPEN"
                    clickHandler={this.openDraft}
                  />
                </div>
              }
              {this.state.shouldStartDraftIndicatorRender &&
                <div>
                  Draft is started!
                </div>
              }
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
                parent="draft"
                displayType={displayType}
                socket={this.props.socket}
                players={players}
              />
              {(currentDraft.ownerUserId === currentUser.uuid && status === 'scheduled') &&
                <Requests draftId={uuid} fetchBy="draft" />
              }
            </div>
          }
          {status === 'closed' &&
            <div>Draft is now closed!</div>
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
