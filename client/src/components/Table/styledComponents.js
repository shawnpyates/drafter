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
  text-align: center;
  min-width: 45%;
`;

const TableTitleLine = styled.tr`
  text-align: left;
`;

const TableTitle = styled.h3`
  display: inline;
`;

const HeaderRow = styled.tr`
  display: table-row;
`;

const DataFrame = styled.table`
  width: 100%;
  margin-top: 20px;
`;

const DataRow = styled.tr`
  display: table-row;

  &:hover {
    background: #7EC0EE !important;
  }
`;

const ColumnHeader = styled.th`
`;

module.exports = {
  Container,
  AddNewButton,
  TableFrame,
  TableTitleLine,
  TableTitle,
  HeaderRow,
  DataFrame,
  DataRow,
  ColumnHeader,
};
