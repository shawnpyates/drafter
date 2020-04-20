import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import uuidv4 from 'uuid';

import { tableGeneral as TABLE_TEXTS } from '../../texts.json';

import { getTextWithInjections } from '../../helpers';

import {
  ColumnHeader,
  Container,
  DataCell,
  DataFrame,
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
  const history = useHistory();
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
            <DataRow
              isEvenNumber={i % 2 === 0}
              optionsExists={!!options}
              key={entry.uuid}
              onClick={() => {
                if (!options) {
                  history.push(
                    getTextWithInjections(
                      DATA_URL,
                      { type: type.toLowerCase(), uuid: entry.uuid },
                    ),
                  );
                }
              }}
            >
              {columnHeaders
                .map(columnHeader => columnHeader.type)
                .map(chType => (
                  <DataCell key={uuidv4()}>
                    {chType === 'options'
                      ? (
                        options.map((option, index) => (
                          <Option
                            value={entry.uuid}
                            onClick={handleOptionClick}
                            key={option}
                            totalNum={options.length}
                            index={index}
                          >
                            {option}
                          </Option>
                        ))
                      )
                      : entry[chType]
                      }
                  </DataCell>
                ))
                }
            </DataRow>
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
  reorderTeamsLink: null,
};

Table.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
  addNewLink: PropTypes.string,
  reorderTeamsLink: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  handleOptionClick: PropTypes.func,
};

export default Table;
