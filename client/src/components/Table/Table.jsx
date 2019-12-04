import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid';

import { tableGeneral as TABLE_TEXTS } from '../../texts.json';

import { getTextWithInjections } from '../../helpers';

import {
  ColumnHeader,
  Container,
  DataCell,
  DataFrame,
  DataLink,
  DataRow,
  EmptyDataMessage,
  HeaderRow,
  Option,
  TableTitle,
  TableButton,
  TableTitleLine,
} from './styledComponents';

const {
  addNew: ADD_NEW,
  dataUrl: DATA_URL,
} = TABLE_TEXTS;

function Table({
  type,
  title,
  columnHeaders,
  data,
  emptyDataMessage,
  addNewLink,
  reorderTeamsLink,
  options,
  handleOptionClick,
}) {
  return (
    <Container>
      <TableTitleLine>
        <TableTitle>{title}</TableTitle>
        {addNewLink
        && (
          <Link to={addNewLink}>
            <TableButton>
              {ADD_NEW}
            </TableButton>
          </Link>
        )}
        {reorderTeamsLink
        && (
          <Link to={reorderTeamsLink}>
            <TableButton>
              Update Selection Order
            </TableButton>
          </Link>
        )}
      </TableTitleLine>
      {Boolean(data.length)
      && (
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
            <DataLink
              to={
                !options
                && getTextWithInjections(DATA_URL, { type: type.toLowerCase(), uuid: entry.uuid })
              }
              key={entry.uuid}
            >
              <DataRow
                isEvenNumber={i % 2 === 0}
                optionsExists={!!options}
              >
                {columnHeaders
                  .map(columnHeader => columnHeader.type)
                  .map(chType => (
                    <DataCell key={uuidv4()}>
                      {chType === "options"
                        ? (
                          options.map(option => (
                            <DataLink to="/" key={option}>
                              <Option
                                value={entry.uuid}
                                onClick={handleOptionClick}
                              >
                                {option}
                              </Option>
                            </DataLink>
                          ))
                        )
                        : entry[chType]
                      }
                    </DataCell>
                  ))
                }
              </DataRow>
            </DataLink>
          ))}
        </DataFrame>
      )}
      {!data.length && <EmptyDataMessage>{emptyDataMessage}</EmptyDataMessage>}
    </Container>
  );
}

Table.defaultProps = {
  addNewLink: null,
  options: null,
  handleOptionClick: null,
};

Table.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
  addNewLink: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  handleOptionClick: PropTypes.func,
};

export default Table;
