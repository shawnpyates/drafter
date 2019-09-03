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
  OptionsContainer,
  Option,
} from './styledComponents';

const Table = ({
  type,
  title,
  columnHeaders,
  data,
  emptyDataMessage,
  addNewLink,
  options,
  handleOptionClick,
}) => (
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
                <ColumnHeader
                  columnHeadersLength={columnHeaders.length}
                  key={header.type}
                >
                  {header.value}
                </ColumnHeader>
              ))}
            </HeaderRow>
            {data.map((entry, i) => (
              <DataRow
                isEvenNumber={i % 2 === 0}
                optionsExists={Boolean(options)}
                key={entry.uuid}
              >
                <DataLink to={!options && `/${type.toLowerCase()}/${entry.uuid}/show`}>
                  {columnHeaders
                    .map(columnHeader => columnHeader.type)
                    .map(chType => <td key={uuidv4()}>{entry[chType]}</td>)
                  }
                </DataLink>
                {options &&
                  <OptionsContainer>
                    {options.map(option => (
                      <DataLink to="/">
                        <Option
                          key={option}
                          value={entry.uuid}
                          onClick={handleOptionClick}
                        >
                          {option}
                        </Option>
                      </DataLink>
                    ))}
                  </OptionsContainer>
                }
              </DataRow>
            ))}
          </DataFrame>
        }
        {!data.length && <DataFrame>{emptyDataMessage}</DataFrame>}
      </tbody>
    </TableFrame>
  </Container>
);

Table.defaultProps = {
  addNewLink: null,
  options: null,
  handleOptionClick: null,
};

Table.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
  addNewLink: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  handleOptionClick: PropTypes.func,
};

export default Table;
