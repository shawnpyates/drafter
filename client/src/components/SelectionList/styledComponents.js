import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
} = styleVars;

const { DRAFT_SELECTION_LIST_ITEM_MIXIN } = mixins;

const Container = styled.div`
  position: absolute;
  ${props => (props.isLeft ? 'left' : 'right')}: 35%;
  transform: translateX(${props => (props.isLeft ? '-' : '')}50%);
  width: 20%;
  min-width: 30rem;
  margin-top: 5rem;

  text-align: ${props => (props.isLeft ? 'left' : 'right')};
`;

const ListTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
`;

const ItemBlock = styled.div`
  cursor: ${props => (
    (props.type === 'Players' && !props.shouldDraftViewBlur && props.isCurrentUserTurn)
      ? 'pointer'
      : 'auto'
  )};

  ${DRAFT_SELECTION_LIST_ITEM_MIXIN}
`;

const SelectButton = styled.button`
  background: ${DARK_BLUE};
  height: 2.5rem;
  width: 6rem;
  border-radius: 2rem;
  margin-right: 0.5rem;
  text-align: center;
  font-weight: 500;
  color: ${WHITE};
  cursor: pointer;
  
  &:hover {
    color: ${SKY_BLUE};
    text-decoration: none;
  }
`;

module.exports = {
  Container,
  ListTitle,
  List,
  ItemBlock,
  ListItem,
  SelectButton,
};
