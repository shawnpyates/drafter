import styled from 'styled-components';

import { styleVars } from '../../styles';

const {
  DARK_BLUE,
  DARK_GRAY,
  LIGHT_GRAY,
  SKY_BLUE,
  WHITE,
  LARGE_FONT_SIZE,
  SMALL_FONT_SIZE,
} = styleVars;

const InfoWrapper = styled.div`
  position: relative;
  background: ${WHITE};
  margin: 2rem auto;
  padding: 3.5rem;
  border-radius: 10px;
  border: 1px solid ${DARK_BLUE};
  width: ${props => (props.shouldAdjustWidth ? '30%' : '50%')};
`;

const InfoTitle = styled.h4`
  font-size: ${LARGE_FONT_SIZE};
  color: ${DARK_GRAY};
  margin-bottom: 2.5rem;
  display: inline-block;
`;

const EditButton = styled.button`
  float: right;
  background: ${DARK_BLUE};
  height: 2.5rem;
  width: 8rem;
  border-radius: 2rem;
  text-align: center;
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 500;
  color: ${WHITE};
  cursor: pointer;

  &:hover {
    color: ${SKY_BLUE};
    text-decoration: none;
  }
`;

const InfoDetails = styled.div`
  font-weight: 300;
  padding-bottom: 1rem;
`;

const InfoProperties = styled.ul`
  position: relative;
  float: left;
  list-style: none;
`;

const InfoValues = styled.ul`
  position: relative;
  text-align: right;
  list-style: none;
`;

const ListItem = styled.li`
  color: ${DARK_GRAY};

  &:not(:last-child) {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid ${LIGHT_GRAY};
  }

  &:not(:first-child) {
    padding-top: 0.8rem;
  }
`;

module.exports = {
  InfoWrapper,
  InfoTitle,
  EditButton,
  InfoDetails,
  InfoProperties,
  InfoValues,
  ListItem,
};
