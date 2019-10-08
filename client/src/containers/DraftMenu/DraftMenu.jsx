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

const { SERVER_URL } = process.env;

const { properties: profileProperties, values: profileValues } = draftProfileData;

const START_DRAFT_INDICATOR_DURATION = 3000;

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
    this.draftSocketId = null;
    this.state = {
      shouldOpenButtonRender: false,
      shouldStartDraftIndicatorRender: false,
    };
  }

  componentDidMount() {
    const {
      fetchOneDraftPropFn,
      fetchCurrentUserPropFn,
    } = this.props;
    fetchOneDraftPropFn();
    fetchCurrentUserPropFn();
    this.socket = ioClient(`${SERVER_URL}/drafts`);
    const { id: draftId } = this.props.match.params;
    this.draftSocketId = `drafts_${draftId}`;
    this.socket.emit('joinDraft', this.draftSocketId);
    this.socket.on('broadcastDraftSelection', () => {
      fetchOneDraftPropFn();
    });
    this.socket.on('broadcastDraftStart', () => {
      this.setState({
        shouldOpenButtonRender: false,
        shouldStartDraftIndicatorRender: true,
      });
      setTimeout(() => {
        this.setState({ shouldStartDraftIndicatorRender: false });
      }, START_DRAFT_INDICATOR_DURATION);
    });
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
  }

  openDraft = () => {
    this.props.updateDraftPropFn({ status: 'open' });
    this.socket.emit('draftStarted', this.draftSocketId);
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
                socket={this.socket}
                draftSocketId={this.draftSocketId}
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
