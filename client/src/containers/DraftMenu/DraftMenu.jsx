import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';


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
  const { draft, socket: socketState, user } = state;
  const { currentDraft } = draft;
  const { socket } = socketState;
  const { currentUser } = user;
  return { currentDraft, socket, currentUser };
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
    const {
      isUserFetchComplete,
      shouldStartDraftIndicatorRender,
    } = this.state;
    if (currentDraft) {
      const now = new Date().toISOString();
      const {
        status,
        timeScheduled,
        currentlySelectingTeamId,
        Teams: teams,
      } = currentDraft;
      if (
        status === 'scheduled'
        && timeScheduled < now
        && !shouldStartDraftIndicatorRender
      ) {
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
    if (!isUserFetchComplete && currentUser) {
      this.listenForSocketEvents(socket);
    }
  }

  listenForSocketEvents = (socket) => {
    const {
      currentDraft,
      fetchOneDraftPropFn,
    } = this.props;
    const { uuid: currentDraftId } = currentDraft || {};
    socket.on('broadcastDraftSelection', (draftId) => {
      if (currentDraftId === draftId) {
        fetchOneDraftPropFn();
      }
    });
    socket.on('broadcastDraftStart', ({ draftId }) => {
      if (currentDraftId === draftId) {
        fetchOneDraftPropFn();
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
    const {
      currentDraft: {
        uuid: draftId,
        name: draftName,
      },
      updateDraftPropFn,
      socket,
    } = this.props;
    updateDraftPropFn({ status: 'open' });
    socket.emit(
      'draftStarted',
      { draftId, draftName },
    );
  }

  renderOpenButtonForOwner = () => {
    const { currentDraft, currentUser } = this.props;
    const { shouldOpenButtonRender } = this.state;
    if (currentDraft.ownerUserId === currentUser.uuid && !shouldOpenButtonRender) {
      this.setState({ shouldOpenButtonRender: true });
    }
  }

  render() {
    const {
      currentDraft,
      currentUser,
      match,
      socket,
    } = this.props;
    const {
      shouldOpenButtonRender,
      shouldStartDraftIndicatorRender,
    } = this.state;
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
      currentDraft
      && (
        <div>
          <ProfileCard
            title={profileCardTitle}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
          />
          {(status === 'scheduled' || status === 'open')
          && (
            <div>
              {(shouldOpenButtonRender && status !== 'open')
              && (
                <div>
                  <Button
                    value="OPEN"
                    clickHandler={this.openDraft}
                  />
                </div>
              )}
              {shouldStartDraftIndicatorRender
              && (
                <div>
                  Draft is started!
                </div>
              )}
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
                socket={socket}
                players={players}
              />
              {(currentDraft.ownerUserId === currentUser.uuid && status === 'scheduled')
                && <Requests draftId={uuid} fetchBy="draft" />
              }
            </div>
          )}
          {status === 'closed'
          && (
            <div>Draft is now closed!</div>
          )}
        </div>
      )
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
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDraftPropFn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
