import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  InnerContent,
  PlayerListItem,
  TeamListItem,
} from './styledComponents';

import { positions } from '../../texts.json';

function Collapsible({ children, isCurrentlySelecting, playersFromTeam }) {
  const [isOpen, toggleOpen] = useState(false);
  const iconText = isOpen ? '-' : '+';
  return (
    <TeamListItem
      isCurrentlySelecting={isCurrentlySelecting}
    >
      {children}
      {!!playersFromTeam.length
      && <Icon onClick={() => toggleOpen(wasOpen => !wasOpen)}>{iconText}</Icon>
      }
      {isOpen
      && (
        <InnerContent>
          {playersFromTeam.map(player => (
            <PlayerListItem key={player.uuid}>
              {`${player.name}`}
              {player.position && ` (${positions[player.position]})`}
            </PlayerListItem>
          ))}
        </InnerContent>
      )}
    </TeamListItem>
  );
}

Collapsible.propTypes = {
  children: PropTypes.string.isRequired,
  isCurrentlySelecting: PropTypes.bool.isRequired,
  playersFromTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Collapsible;
