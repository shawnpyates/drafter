import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid';

import {
  Container,
  AddNewButton,
  TableFrame,
  TableTitleLine,
  TableTitle,
  HeaderRow,
  DataFrame,
  DataRow,
  ColumnHeader,
  DataLink,
} from './styledComponents';

const Table = ({
  type,
  title,
  columnHeaders,
  data,
  emptyDataMessage,
  addNewLink,
}) => {
  const getCellsForRow = (dataEntry) => {
    const { id, ...dataEntryMinusId } = dataEntry;
    const vals = Object.values(dataEntryMinusId);
    return vals.map(val => <td>{val}</td>);
  };
  const newLink = addNewLink || `/create${type}`;
  return (
    <Container>
      <TableFrame>
        <tbody>
          <TableTitleLine>
            <th>
              <TableTitle>{title}</TableTitle>
              <Link to={newLink}>
                <AddNewButton>
                  Add New
                </AddNewButton>
              </Link>
            </th>
          </TableTitleLine>
          {Boolean(data.length) &&
            <DataFrame>
              <HeaderRow>
                {columnHeaders.map(header => (
                  <ColumnHeader style={{ width: `${100 / columnHeaders.length}%` }}>
                    {header}
                  </ColumnHeader>
                ))}
              </HeaderRow>
              {data.map((entry, i) => (
                <DataLink to={`/${type.toLowerCase()}/${entry.id}/show`}>
                  <DataRow
                    key={uuidv4()}
                    isEvenNumber={i % 2 === 0}
                  >
                    {getCellsForRow(entry)}
                  </DataRow>
                </DataLink>
              ))}
            </DataFrame>
          }
          {!data.length && <DataFrame>{emptyDataMessage}</DataFrame>}
        </tbody>
      </TableFrame>
    </Container>
  );
};

Table.defaultProps = {
  addNewLink: null,
};

Table.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
  addNewLink: PropTypes.string,
};

export default Table;
