import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from '../../components/ProfileCard/profileCard';
import { draft as draftProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import Players from '../Players/players';
import Teams from '../Teams/teams';

import { fetchTeamsByDraft, fetchUsersByDraft } from '../../actions';

const { properties: profileProperties, values: profileValues } = draftProfileData;

const mapStateToProps = (state) => {
  const { drafts, teams, users } = state.draft;
  return { drafts, teams, users };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchTeamsByDraft: () => dispatch(fetchTeamsByDraft(id)),
    fetchUsersByDraft: () => dispatch(fetchUsersByDraft(id)),
  };
};

const DraftMenu = ({ drafts, match }) => {
  const currentDraft = drafts.find(draft => draft.uuid === match.params.id);
  const profileCardTitle = currentDraft.name;
  const { scheduledFor, owner } = profileProperties;
  const { unscheduled } = profileValues;
  const { id, timeScheduled, ownerName } = currentDraft;
  const profileCardData = {
    [scheduledFor]: timeScheduled || unscheduled,
    [owner]: ownerName,
  };
  const profileCardLinkForUpdating = `/updateDraft/${id}`;
  return (
    <div>
      <ProfileCard
        title={profileCardTitle}
        data={profileCardData}
        linkForUpdating={profileCardLinkForUpdating}
      />
      <Teams draftId={currentDraft.uuid} fetchBy="draft" match={match} />
      <Players draftId={currentDraft.uuid} fetchBy="draft" />
    </div>
  );
};

DraftMenu.propTypes = {
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
