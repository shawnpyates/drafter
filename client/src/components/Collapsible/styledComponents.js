import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DRAFT_SELECTION_LIST_ITEM_MIXIN,
} = mixins;

const {
  EXTRA_SMALL_FONT_SIZE,
  LARGE_FONT_SIZE,
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
} = styleVars;

const ContentText = styled.p`
  left: 0%;
  right: 0%;
  text-align: center;
`;

const Icon = styled.span`
  cursor: pointer;
  font-size: ${LARGE_FONT_SIZE};
  color: ${DARK_BLUE};
  position: absolute;
  right: 1rem;
  top: 0.5rem;
`;

const InnerContent = styled.ul`
  margin-top: 1rem;
`;

const PlayerListItem = styled.li`
  color: ${DARK_BLUE};
  font-size: ${EXTRA_SMALL_FONT_SIZE};
  list-style: none;
`;

const TeamListItem = styled.li`
  background-color: ${props => (props.isCurrentlySelecting || props.isFocussed ? SKY_BLUE : WHITE)};

  ${DRAFT_SELECTION_LIST_ITEM_MIXIN}
`;

module.exports = {
  ContentText,
  Icon,
  InnerContent,
  PlayerListItem,
  TeamListItem,
};
