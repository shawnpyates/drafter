import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid';
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

const ProfileCard = ({ title, data }) => (
  <InfoWrapper>
    <InfoTitle>{title}</InfoTitle>
    <Link to="/updateUser">
      <EditButton>
        Edit
      </EditButton>
    </Link>
    <InfoDetails>
      <InfoProperties>
        {Object.keys(data).map(prop => <ListItem key={uuidv4()}>{prop}</ListItem>)}
      </InfoProperties>
      <InfoValues>
        {Object.values(data).map(val => <ListItem key={uuidv4()}>{val}</ListItem>)}
      </InfoValues>
    </InfoDetails>
  </InfoWrapper>
);

ProfileCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileCard;
