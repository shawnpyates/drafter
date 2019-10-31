import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid';

import {
  InfoWrapper,
  InfoTitle,
  EditButton,
  InfoDetails,
  InfoProperties,
  InfoValues,
  ListItem,
} from './styledComponents';

const ProfileCard = ({
  title,
  data,
  shouldUpdatingLinkRender,
  linkForUpdating,
  shouldAdjustWidth,
}) => (
  <InfoWrapper shouldAdjustWidth={shouldAdjustWidth}>
    <InfoTitle>{title}</InfoTitle>
    {shouldUpdatingLinkRender
    && (
      <Link to={linkForUpdating}>
        <EditButton>
          Edit
        </EditButton>
      </Link>
    )}
    <InfoDetails>
      <InfoProperties>
        {Object.keys(data).map(prop => <ListItem key={prop}>{prop}</ListItem>)}
      </InfoProperties>
      <InfoValues>
        {Object.values(data).map(val => <ListItem key={uuidv4()}>{val}</ListItem>)}
      </InfoValues>
    </InfoDetails>
  </InfoWrapper>
);

ProfileCard.defaultProps = {
  shouldAdjustWidth: null,
  shouldUpdatingLinkRender: true,
};

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldAdjustWidth: PropTypes.bool,
  shouldUpdatingLinkRender: PropTypes.bool,
  linkForUpdating: PropTypes.string.isRequired,
};

export default ProfileCard;
