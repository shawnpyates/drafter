import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  InnerContent,
  PlayerListItem,
  TeamListItem,
} from './styledComponents';

import { positions } from '../../../texts.json';

class Collapsible extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  togglePanel = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    const { children, playersFromTeam } = this.props;
    const iconText = isOpen ? '-' : '+';
    return (
      <TeamListItem
        isCurrentlySelecting={this.props.isCurrentlySelecting}
      >
        {children}<Icon onClick={this.togglePanel}>{iconText}</Icon>
        {isOpen
        && (
          <InnerContent>
            {playersFromTeam.map(player => (
              <PlayerListItem>
                {`${player.name}`}{player.position && ` (${positions[player.position]})`}
              </PlayerListItem>
            ))}
          </InnerContent>
        )}
      </TeamListItem>
    );
  }
}

Collapsible.propTypes = {
  children: PropTypes.string.isRequired,
  playersFromTeam: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Collapsible;
