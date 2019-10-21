import React, { Component } from 'react';
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
              players,
            } = item;
            const isFocussed = uuid === this.state.focussedPlayerId;
            return (
              type === 'Players'
                ? (
                  <div key={uuid}>
                    <ListItem
                      isFocussed={isFocussed}
                      type={type}
                      value={uuid}
                      shouldDraftViewBlur={shouldDraftViewBlur}
                      onClick={() => this.changePlayerFocus(uuid)}
                    >
                      {name}{position && ` (${positions[position]})`}
                    </ListItem>
                    {isFocussed
                    && (
                      <SelectButton onClick={() => assignPlayerToTeam(uuid)}>
                        Select
                      </SelectButton>
                    )}
                  </div>
                )
                : (
                  <Collapsible
                    key={uuid}
                    isCurrentlySelecting={isCurrentlySelecting}
                    playersFromTeam={players}
                  >
                    {name}
                  </Collapsible>
                )
            );
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
};

export default SelectionList;
