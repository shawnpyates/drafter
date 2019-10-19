import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  InnerContent,
  ListItem,
} from './styledComponents';

// import { Table } from '..';

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
    const iconText = isOpen ? '-' : '+';
    return (
      <ListItem
        isCurrentlySelecting={this.props.isCurrentlySelecting}
      >
        {this.props.children}<Icon onClick={this.togglePanel}>{iconText}</Icon>
        {this.state.isOpen
        && (
          <InnerContent>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
          </InnerContent>
        )}
      </ListItem>
    );
  }
}

Collapsible.defaultProps = {
  // positions: null,
  // assignPlayerToTeam: null,
};

Collapsible.propTypes = {
  // type: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // positions: PropTypes.objectOf(PropTypes.any),
  // assignPlayerToTeam: PropTypes.func,
};

export default Collapsible;
