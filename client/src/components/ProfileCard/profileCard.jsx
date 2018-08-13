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

const ProfileCard = ({ title, data, linkForUpdating }) => (
  <InfoWrapper>
    <InfoTitle>{title}</InfoTitle>
    <Link to={linkForUpdating}>
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
  title: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  linkForUpdating: PropTypes.string.isRequired,
};

export default ProfileCard;
