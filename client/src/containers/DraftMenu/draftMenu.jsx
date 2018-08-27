import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard/profileCard.jsx';
import { draft as draftProfileData } from '../../components/ProfileCard/profileCardConstants.json';
import { fetchTeamsByDraft, fetchUsersByDraft } from '../../actions';
import Teams from '../Teams/teams.jsx';
import Players from '../Players/players.jsx';

const { properties: profileProperties, values: profileValues } = draftProfileData;

const mapStateToProps = (state) => {
  const { drafts, teams, users } = state.draft;
  return { drafts, teams, users };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchTeamsByDraft: body => dispatch(fetchTeamsByDraft(id)),
    fetchUsersByDraft: body => dispatch(fetchUsersByDraft(id)),
  };
};

class DraftMenu extends Component {

  render() {
    const { drafts, teams, users, match } = this.props;
    const currentDraft = drafts.find(draft => draft.id === Number(match.params.id));
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
        <Teams draftId={currentDraft.id} fetchBy='draft' />
        <Players draftId={currentDraft.id} fetchBy='draft' />
      </div>
    );
  }
};

DraftMenu.propTypes = {
  drafts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftMenu);
