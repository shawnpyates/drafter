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

const WHITE_ROW_BACKGROUND = '#FFF';
const SHADED_ROW_BACKGROUND = '#F2F3F4';

const Table = ({
  type,
  title,
  columnHeaders,
  data,
  emptyDataMessage,
}) => {
  const getCellsForRow = (dataEntry) => {
    const { id, ...dataEntryMinusId } = dataEntry;
    const vals = Object.values(dataEntryMinusId);
    return vals.map(val => <td>{val}</td>);
  };
  const addNewLink = `/create${type}`;
  return (
    <Container>
      <TableFrame>
        <tbody>
          <TableTitleLine>
            <th>
              <TableTitle>{title}</TableTitle>
              <Link to={addNewLink}>
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
                <DataLink to={`${type.toLowerCase()}/${entry.id}`}>
                  <DataRow
                    key={uuidv4()}
                    style={{
                      backgroundColor: i % 2 === 0 ? SHADED_ROW_BACKGROUND : WHITE_ROW_BACKGROUND,
                    }}
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

Table.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
};

export default Table;
