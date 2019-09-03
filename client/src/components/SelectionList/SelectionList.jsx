import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ListTitle,
  List,
  ListItem,
  SelectButton,
} from './styledComponents';

class SelectionList extends Component {
  constructor() {
    super();
    this.state = {
      focussedPlayerId: null,
    };
  }
  changePlayerFocus = (uuid, type) => {
    if (type !== 'Players') {
      return;
    }
    this.setState({ focussedPlayerId: uuid });
  };

  render() {
    const {
      type,
      title,
      data,
      positions,
      assignPlayerToTeam,
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
            } = item;
            const isFocussed = uuid === this.state.focussedPlayerId;
            return (
              <div>
                <ListItem
                  isCurrentlySelecting={isCurrentlySelecting}
                  isFocussed={isFocussed}
                  type={type}
                  value={uuid}
                  onClick={() => this.changePlayerFocus(uuid, type)}
                >
                  {name}{(positions && position) && ` (${positions[position]})`}
                </ListItem>
                {isFocussed &&
                  <SelectButton onClick={() => assignPlayerToTeam(uuid)}>
                    Select
                  </SelectButton>
                }
              </div>
            );
          })}
        </List>
      </Container>
    );
  }
}

SelectionList.defaultProps = {
  positions: null,
  assignPlayerToTeam: null,
};

SelectionList.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.objectOf(PropTypes.any),
  assignPlayerToTeam: PropTypes.func,
};

export default SelectionList;
