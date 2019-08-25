import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ListTitle,
  ListItem,

} from './styledComponents';

const SelectionList = ({
  type,
  title,
  data,
  positions,
  // TODO: handleSelect
}) => (
  <Container isLeft={type === 'Teams'}>
    <ListTitle>{title}</ListTitle>
    {data.map(item => (
      <ul>
        <ListItem>
          {item.name}{(positions && item.position) && ` (${positions[item.position]})`}
        </ListItem>
      </ul>
    ))}
  </Container>
);

SelectionList.defaultProps = {
  positions: null,
};

SelectionList.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // handleSelect: PropTypes.func.isRequired,
  positions: PropTypes.objectOf(PropTypes.any),
};

export default SelectionList;
