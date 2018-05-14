import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const AddNewButton = styled.a`
  background: #11133F;
  float: right;
  height: 25px;
  width: 130px;
  border-radius: 20px;
  text-align: center;
  font-weight: 500;
  color: #FFF !important;
  cursor: pointer;
  margin-right: 40px;

  &:hover {
    color: #7EC0EE !important;
    text-decoration: none;
  }
`;

const TableFrame = styled.table`
  text-align: center
  min-width: 45%;
`;

const TableTitleLine = styled.tr`
  text-align: left;
`;

const TableTitle = styled.h3`
  display: inline;
`;

const HeaderRow = styled.tr`
`;

const DataFrame = styled.div`
  margin-top: 20px;
`;

const DataRow = styled.tr`
`;

const ColumnHeader = styled.th`
  width: 50%;
`;

const Table = ({
  title,
  columnHeaders,
  data,
  emptyDataMessage,
  addNew,
}) => {
  const getCellsForRow = (dataEntry) => {
    const vals = Object.values(dataEntry);
    return vals.map(val => <td>{val}</td>);
  };
  return (
    <Container>
      <TableFrame>
        <tbody>
          <TableTitleLine>
            <th>
              <TableTitle>{title}</TableTitle>
              <AddNewButton onClick={addNew}>
                Add New
              </AddNewButton>
            </th>
          </TableTitleLine>
          {Boolean(data.length) &&
            <DataFrame>
              <HeaderRow>
                {columnHeaders.map(header => <ColumnHeader>{header}</ColumnHeader>)}
              </HeaderRow>
              {data.map(entry => <DataRow>{getCellsForRow(entry)}</DataRow>)}
            </DataFrame>
          }
          {!data.length && <DataFrame>{emptyDataMessage}</DataFrame>}
        </tbody>
      </TableFrame>
    </Container>
  );
};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
  addNew: PropTypes.func.isRequired,
};

export default Table;
