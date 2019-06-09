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
    const { uuid, ...dataEntryMinusId } = dataEntry;
    const vals = Object.values(dataEntryMinusId);
    return vals.map(val => <td>{val}</td>);
  };
  return (
    <Container>
      <TableFrame>
        <tbody>
          <TableTitleLine>
            <th>
              <TableTitle>{title}</TableTitle>
              {addNewLink &&
                <Link to={addNewLink}>
                  <AddNewButton>
                    Add New
                  </AddNewButton>
                </Link>
              }
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
                <DataLink to={`/${type.toLowerCase()}/${entry.uuid}/show`}>
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
