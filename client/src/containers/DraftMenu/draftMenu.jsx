import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from '../../components/ProfileCard/profileCard';
import { draft as draftProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import Players from '../Players/players';
import Teams from '../Teams/teams';
import Requests from '../Requests/requests';

import { fetchOneDraft, fetchCurrentUser } from '../../actions';

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
  render() {
    const { currentDraft, currentUser, match } = this.props;
    const {
      uuid,
      timeScheduled,
      ownerName,
      name: profileCardTitle,
    } = currentDraft || {};
    const { scheduledFor, owner } = profileProperties;
    const { unscheduled } = profileValues;
    const profileCardData = {
      [scheduledFor]: timeScheduled || unscheduled,
      [owner]: ownerName,
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
          <Teams draftId={uuid} fetchBy="draft" match={match} />
          <Players draftId={uuid} fetchBy="draft" />
          {(currentDraft.ownerUserId === currentUser.uuid) &&
            <Requests draftId={uuid} fetchBy="draft" />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
