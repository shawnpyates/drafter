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

import { Button, LoadingIndicator, Timer } from '../../components';

import {
  fetchOneDraft,
  updateDraft,
  updatePlayer,
} from '../../actions';

import {
  BlurContainer,
  InfoContainer,
  InfoText,
} from './styledComponents';

import { getTextWithInjections } from '../../helpers';

import {
  draftInfoTexts,
  draftButtonOpenText as DRAFT_BUTTON_OPEN_TEXT,
} from '../../../texts.json';

const {
  draftStarting: DRAFT_STARTING,
  draftSelection: DRAFT_SELECTION,
  draftRandomAssignment: DRAFT_RANDOM_ASSIGNMENT,
} = draftInfoTexts;

const DRAFT_STATUSES = {
  UNSCHEDULED: 'unscheduled',
  SCHEDULED: 'scheduled',
  OPEN: 'open',
};

const DISPLAY_TYPES = {
  TABLE: 'table',
  SELECTION_LIST: 'selectionList',
};

const { properties: profileProperties, values: profileValues } = draftProfileData;

const { unscheduled: DRAFT_UNSCHEDULED } = profileValues;

const mapStateToProps = (state) => {
  const { draft, socket: socketState, user } = state;
  const {
    currentDraft,
    draftInfoText,
    shouldDraftViewBlur,
    fetching: isFetchingDraft,
  } = draft;
  const { socket } = socketState;
  const { currentUser } = user;
  return {
    currentDraft,
    draftInfoText,
    socket,
    currentUser,
    shouldDraftViewBlur,
    isFetchingDraft,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOneDraftPropFn: (message) => dispatch(fetchOneDraft(id, message)),
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
      isInitialDraftFetchComplete: false,
      hasDraftStarted: false,
      lastSelectingTeam: null,
      parsedTimeChange: null,
      timeScheduledReadable: null,
    };
  }

  componentDidMount() {
    const {
      fetchOneDraftPropFn,
    } = this.props;
    fetchOneDraftPropFn();
  }

  componentDidUpdate(prevProps) {
    const {
      currentDraft,
      socket,
      draftInfoText,
    } = this.props;
    const { isInitialDraftFetchComplete } = this.state;
    if (currentDraft) {
      const now = new Date().toISOString();
      const {
        status,
        timeScheduled,
      } = currentDraft;
      if (
        status === DRAFT_STATUSES.SCHEDULED
        && timeScheduled < now
        && !draftInfoText
      ) {
        this.renderOpenButtonForOwner();
      }
      if (!isInitialDraftFetchComplete) {
        this.setState({ isInitialDraftFetchComplete: true }, () => {
          this.listenForSocketEvents(socket);
        });
      }
      const { currentDraft: previousDraft } = prevProps;
      this.parseDraftDates(currentDraft, previousDraft);
    }
  }

  parseDraftDates = (currentDraft, previousDraft) => {
    const {
      selectingTeamChangeTime: currentChangeTime,
      timeScheduled: currentTimeScheduled,
    } = currentDraft || {};
    const {
      selectingTeamChangeTime: previousChangeTime,
      timeScheduled: previousTimeScheduled
    } = previousDraft || {};
    if (currentChangeTime && (!previousDraft || previousChangeTime !== currentChangeTime)) {
      this.setState({ parsedTimeChange: Date.parse(selectingTeamChangeTime) });
    }
    if (
      currentTimeScheduled
      && (!previousDraft || previousTimeScheduled !== currentTimeScheduled)
      && status === DRAFT_STATUSES.SCHEDULED
    ) {
      this.setState({
        timeScheduledReadable: moment(timeScheduled).format('MMM D YYYY, h:mm a'),
      });
    }
  }

  assignPlayerToTeam = (playerId) => {
    const {
      currentDraft,
      socket,
      updatePlayerPropFn,
    } = this.props;
    const { Players: players, Teams: teams } = currentDraft;
    // team is assigned random player if they don't make selection in time
    let randomPlayerId;
    if (!playerId) {
      const filteredPlayers = players.filter(player => !player.teamId);
      randomPlayerId = (
        filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)].uuid
      );
    }
    const { currentlySelectingTeamId } = currentDraft;
    const { name: teamName } = teams.find(team => team.uuid === currentlySelectingTeamId);
    const { name: playerName } = players.find(player => (
      player.uuid === (playerId || randomPlayerId)
    ));
    updatePlayerPropFn({
      id: playerId || randomPlayerId,
      body: { teamId: currentlySelectingTeamId },
      socket,
      draftId: currentDraft.uuid,
      teamName,
      playerName,
      isRandomAssignment: !!randomPlayerId,
    });
  }

  listenForSocketEvents = (socket) => {
    const {
      currentDraft,
      fetchOneDraftPropFn,
    } = this.props;
    const { uuid: currentDraftId } = currentDraft || {};
    socket.on('broadcastDraftSelection', ({
      draftId,
      teamName,
      playerName,
      isRandomAssignment,
     }) => {
      const { currentlySelectingTeamId } = this.props.currentDraft;
      if (
        this.state.lastSelectingTeam !== currentlySelectingTeamId
        && currentDraftId === draftId
      ) {
        this.setState({ lastSelectingTeam: currentlySelectingTeamId }, () => {
          const message = getTextWithInjections(
            isRandomAssignment ? DRAFT_RANDOM_ASSIGNMENT : DRAFT_SELECTION,
            { teamName, playerName },
          );
          fetchOneDraftPropFn(message);
        });
      }
    });
    socket.on('broadcastDraftStart', ({ draftId }) => {
      if (!this.hasDraftStarted && currentDraftId === draftId) {
        this.setState({ shouldOpenButtonRender: false, hasDraftStarted: true }, () => {
          fetchOneDraftPropFn(DRAFT_STARTING);
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
        status: DRAFT_STATUSES.OPEN,
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
      shouldDraftViewBlur,
      isFetchingDraft,
    } = this.props;
    const {
      shouldOpenButtonRender,
      parsedTimeChange,
    } = this.state;
    const {
      uuid,
      name,
      status,
      User: owner,
      Players: players,
      Requests: requests,
      Teams: teams,
    } = currentDraft || {};
    const ownerName = owner && `${owner.firstName} ${owner.lastName}`;
    const { scheduledFor, owner: ownerKey } = profileProperties;
    const readableTime = parsedTimeChange || DRAFT_UNSCHEDULED;
    const profileCardData = {
      [scheduledFor]: readableTime,
      [ownerKey]: ownerName,
    };
    const profileCardLinkForUpdating = `/updateDraft/${uuid}`;
    const displayType = (
      status === DRAFT_STATUSES.SCHEDULED || status === DRAFT_STATUSES.UNSCHEDULED
        ? DISPLAY_TYPES.TABLE
        : DISPLAY_TYPES.SELECTION_LIST
    );
    return (
      <div>
        {(currentDraft && !isFetchingDraft)
        && (
          <div>
            <ProfileCard
              title={name}
              data={profileCardData}
              linkForUpdating={profileCardLinkForUpdating}
            />
            <div>
              {(shouldOpenButtonRender && status !== DRAFT_STATUSES.OPEN)
              && (
                <div>
                  <Button
                    value={DRAFT_BUTTON_OPEN_TEXT}
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
              {parsedTimeChange
              && (
                <Timer
                  expiryTime={parsedTimeChange}
                  assignPlayerToTeam={this.assignPlayerToTeam}
                />
              )}
              <BlurContainer shouldDraftViewBlur={shouldDraftViewBlur}>
                <Teams
                  parent="draft"
                  match={match}
                  displayType={displayType}
                  teams={teams}
                />
                <Players
                  draft={currentDraft}
                  parent="draft"
                  displayType={displayType}
                  players={players}
                  assignPlayerToTeam={this.assignPlayerToTeam}
                />
              </BlurContainer>
              {(
                currentDraft.ownerUserId === currentUser.uuid
                && displayType === DISPLAY_TYPES.TABLE
              )
              && <Requests requests={requests} fetchBy="draft" />
              }
            </div>
          </div>
        )}
        {isFetchingDraft && <LoadingIndicator />}
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
  fetchOneDraftPropFn: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDraftPropFn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
