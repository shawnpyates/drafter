import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        {Object.values(data).map((val, i) => <ListItem key={`${val}-${i}`}>{val}</ListItem>)}
      </InfoValues>
    </InfoDetails>
  </InfoWrapper>
);

ProfileCard.defaultProps = {
  shouldUpdatingLinkRender: true,
};

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldUpdatingLinkRender: PropTypes.bool,
  linkForUpdating: PropTypes.string.isRequired,
};

export default ProfileCard;
