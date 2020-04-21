import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  ListTitle,
  List,
  ItemBlock,
  ListItem,
  SelectButton,
} from './styledComponents';

import { positions } from '../../texts.json';

import Collapsible from '../Collapsible/Collapsible';

import { blurDraft } from '../../actions';

const mapStateToProps = state => ({
  currentDraft: state.draft.currentDraft,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  blurDraftPropFn: () => dispatch(blurDraft()),
});

const isCurrentUserSelecting = (draft, user) => {
  const { Teams: teams } = draft;
  return teams.find(team => (
    team.uuid === draft.currentlySelectingTeamId
  )).ownerUserId === user.uuid;
};

function SelectionList({
  type,
  title,
  data,
  assignPlayerToTeam,
  shouldDraftViewBlur,
  currentDraft,
  currentUser,
  blurDraftPropFn,
}) {
  const [focussedPlayerId, setPlayerFocus] = useState(null);
  const handleSelection = (uuid) => {
    blurDraftPropFn();
    assignPlayerToTeam(uuid);
  };
  return (
    <Container isLeft={type === 'Teams'}>
      <ListTitle>{title}</ListTitle>
      <List>
        {data.map((item) => {
          const {
            uuid,
            isCurrentlySelecting,
            name,
            position,
            players = [],
          } = item;
          const isFocussed = uuid === focussedPlayerId;
          if (type === 'Players') {
            const isCurrentUserTurn = isCurrentUserSelecting(currentDraft, currentUser);
            return (
              <ListItem key={uuid}>
                <div>
                  {(isFocussed && isCurrentUserTurn)
                  && (
                    <SelectButton onClick={() => handleSelection(uuid)}>
                      Select
                    </SelectButton>
                  )}
                  <ItemBlock
                    isFocussed={isFocussed}
                    type={type}
                    value={uuid}
                    shouldDraftViewBlur={shouldDraftViewBlur}
                    isCurrentUserTurn={isCurrentUserTurn}
                    onClick={() => setPlayerFocus(uuid)}
                  >
                    {name}
                    {position && ` (${positions[position]})`}
                  </ItemBlock>
                </div>
              </ListItem>
            );
          }
          return (
            <Collapsible
              key={uuid}
              isCurrentlySelecting={isCurrentlySelecting}
              playersFromTeam={players}
            >
              {name}
            </Collapsible>
          );
        })}
      </List>
    </Container>
  );
}

SelectionList.defaultProps = {
  assignPlayerToTeam: null,
};

SelectionList.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  assignPlayerToTeam: PropTypes.func,
  currentDraft: PropTypes.objectOf(PropTypes.any).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldDraftViewBlur: PropTypes.bool.isRequired,
  blurDraftPropFn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionList);
