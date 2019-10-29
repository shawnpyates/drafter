import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  ListTitle,
  List,
  ListItem,
  SelectButton,
} from './styledComponents';

import { positions } from '../../../texts.json';

import { Collapsible } from '..';

const mapStateToProps = state => ({
  currentDraft: state.draft.currentDraft,
  currentUser: state.user.currentUser,
});

const isCurrentUserSelecting = (draft, user) => {
  const { Teams: teams } = draft;
  return teams.find(team => (
    team.uuid === draft.currentlySelectingTeamId
  )).ownerUserId === user.uuid;
}

class SelectionList extends Component {
  constructor() {
    super();
    this.state = {
      focussedPlayerId: null,
    };
  }

  changePlayerFocus = (uuid) => {
    this.setState({ focussedPlayerId: uuid });
  };

  render() {
    const {
      type,
      title,
      data,
      assignPlayerToTeam,
      shouldDraftViewBlur,
      currentDraft,
      currentUser,
    } = this.props;
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
            const isFocussed = uuid === this.state.focussedPlayerId;
            if (type === 'Players') {
              const isCurrentUserTurn = isCurrentUserSelecting(currentDraft, currentUser);
              return (
                <div key={uuid}>
                  <ListItem
                    isFocussed={isFocussed}
                    type={type}
                    value={uuid}
                    shouldDraftViewBlur={shouldDraftViewBlur}
                    isCurrentUserTurn={isCurrentUserTurn}
                    onClick={() => this.changePlayerFocus(uuid)}
                  >
                    {name}{position && ` (${positions[position]})`}
                  </ListItem>
                  {(isFocussed && isCurrentUserTurn)
                  && (
                    <SelectButton onClick={() => assignPlayerToTeam(uuid)}>
                      Select
                    </SelectButton>
                  )}
                </div>
              );
            } else {
              return (
                <Collapsible
                  key={uuid}
                  isCurrentlySelecting={isCurrentlySelecting}
                  playersFromTeam={players}
                >
                  {name}
                </Collapsible>
              );
            }
          })}
        </List>
      </Container>
    );
  }
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
};

export default connect(mapStateToProps)(SelectionList);
