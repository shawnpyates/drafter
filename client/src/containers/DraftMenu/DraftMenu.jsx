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
  updateDraft,
  updatePlayer,
} from '../../actions';

import { InfoContainer, InfoText } from './styledComponents';

const { properties: profileProperties, values: profileValues } = draftProfileData;

const mapStateToProps = (state) => {
  const { draft, socket: socketState, user } = state;
  const { currentDraft, draftInfoText } = draft;
  const { socket } = socketState;
  const { currentUser } = user;
  return {
    currentDraft,
    draftInfoText,
    socket,
    currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOneDraftPropFn: (isStart) => dispatch(fetchOneDraft(id, isStart)),
    updateDraftPropFn: (body, socket) => dispatch(updateDraft({ id, body, socket })),
    updatePlayerPropFn: args => dispatch(updatePlayer(args)),
  };
};

class DraftMenu extends Component {
  constructor() {
    super();
    this.state = {
      shouldOpenButtonRender: false,
      shouldStartDraftIndicatorRender: false,
      isUserFetchComplete: false,
      hasDraftStarted: false,
    };
  }

  componentDidMount() {
    const {
      fetchOneDraftPropFn,
    } = this.props;
    fetchOneDraftPropFn();
  }

  componentDidUpdate() {
    const {
      currentDraft,
      currentUser,
      socket,
      draftInfoText,
    } = this.props;
    const { isUserFetchComplete } = this.state;
    if (currentDraft) {
      const now = new Date().toISOString();
      const {
        status,
        timeScheduled,
      } = currentDraft;
      if (
        status === 'scheduled'
        && timeScheduled < now
        && !draftInfoText
      ) {
        this.renderOpenButtonForOwner();
      } 
    }
    if (!isUserFetchComplete && currentUser) {
      this.listenForSocketEvents(socket);
    }
  }

  assignPlayerToTeam = (playerId) => {
    const {
      currentDraft,
      socket,
      updatePlayerPropFn,
    } = this.props;
    const { Players: players } = currentDraft;
    // team is assigned random player if they don't make selection in time
    const randomPlayerId = (
      !playerId
      && players[Math.floor(Math.random() * players.length)].uuid
    );
    const { currentlySelectingTeamId } = currentDraft;
    updatePlayerPropFn({
      id: playerId || randomPlayerId,
      body: { teamId: currentlySelectingTeamId },
      socket,
      draftId: currentDraft.uuid,
    });
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
      if (!this.hasDraftStarted && currentDraftId === draftId) {
        this.setState({ shouldOpenButtonRender: false, hasDraftStarted: true }, () => {
          fetchOneDraftPropFn(true);
        });
      }
    });
  }

  openDraft = () => {
    const {
      currentDraft: {
        Teams: teams,
      },
      updateDraftPropFn,
      socket,
    } = this.props;
    updateDraftPropFn(
      {
        status: 'open',
        currentlySelectingTeamId: teams[0].uuid,
      },
      socket,
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
      draftInfoText,
    } = this.props;
    const {
      shouldOpenButtonRender,
    } = this.state;
    const {
      uuid,
      timeScheduled,
      name: profileCardTitle,
      status,
      User: owner,
      currentlySelectingTeamId,
      selectingTeamChangeTime,
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
    const expiryTime = selectingTeamChangeTime && Date.parse(selectingTeamChangeTime);
    const profileCardData = {
      [scheduledFor]: readableTime,
      [ownerKey]: ownerName,
    };
    const profileCardLinkForUpdating = `/updateDraft/${uuid}`;
    const displayType = status === 'scheduled' ? 'table' : 'selectionList';
    console.log('EXPIRY: ', expiryTime);
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
              <InfoContainer>
                {draftInfoText
                && (
                  <InfoText>
                    {draftInfoText}
                  </InfoText>
                )}
              </InfoContainer>
              {expiryTime
              && (
                <Timer
                  expiryTime={expiryTime}
                  assignPlayerToTeam={this.assignPlayerToTeam}
                />
              )}
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
                players={players}
                assignPlayerToTeam={this.assignPlayerToTeam}
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
  fetchOneDraftPropFn: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDraftPropFn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
