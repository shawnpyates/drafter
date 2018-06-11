import React from 'react';
import PropTypes from 'prop-types';
import { profileProperties, profileValues } from './profileCardConstants.json';

import {
  InfoWrapper,
  InfoTitle,
  EditButton,
  InfoDetails,
  InfoProperties,
  InfoValues,
  ListItem,
} from './styledComponents';

const ProfileCard = ({ user }) => (
  <InfoWrapper>
    <InfoTitle>{`${user.firstName} ${user.lastName}`}</InfoTitle>
    <EditButton href="#">
      Edit
    </EditButton>
    <InfoDetails>
      <InfoProperties>
        <ListItem>{profileProperties.email}</ListItem>
        <ListItem>{profileProperties.registeredAsPlayer}</ListItem>
        <ListItem>{profileProperties.position}</ListItem>
      </InfoProperties>
      <InfoValues>
        <ListItem>{user.email}</ListItem>
        <ListItem>
          {user.registeredAsPlayer ? profileValues.registeredYes : profileValues.registeredNo}
        </ListItem>
        <ListItem>{user.position || profileValues.positionNotApplicable}</ListItem>
      </InfoValues>
    </InfoDetails>
  </InfoWrapper>
);

ProfileCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileCard;
