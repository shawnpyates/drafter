import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid';

import {
  Container,
  // AddNewButton,
  // SelectionListFrame,
  // SelectionListTitleLine,
  // SelectionListTitle,
  // HeaderRow,
  // DataFrame,
  // DataRow,
  // ColumnHeader,
  // DataLink,
  // OptionsContainer,
  // Option,
} from './styledComponents';

const getCellsForRow = (dataEntry) => {
  const { uuid, ...dataEntryMinusId } = dataEntry;
  const vals = Object.values(dataEntryMinusId);
  return vals.map(val => <td key={uuidv4()}>{val}</td>);
};

const SelectionList = ({
  type,
  title,
  data,
  emptyDataMessage,
  handleSelect,
}) => (
  <Container isLeft={type === 'Teams'}>
    <p>Look I am a Selection List.</p>
  </Container>
);

SelectionList.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default SelectionList;
