import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { styleVars } from '../../styles';

const {
  DARK_BLUE,
  LIGHT_GRAY,
  SKY_BLUE,
  WHITE,
} = styleVars;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const AddNewButton = styled.a`
  background: ${DARK_BLUE};
  float: right;
  height: 25px;
  width: 130px;
  border-radius: 20px;
  text-align: center;
  font-weight: 500;
  color: ${WHITE} !important;
  cursor: pointer;
  margin-right: 40px;

  &:hover {
    color: ${SKY_BLUE} !important;
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
  background-color: ${props => (props.isEvenNumber ? LIGHT_GRAY : WHITE)};
  cursor: pointer;

  &:hover {
  background: ${SKY_BLUE} !important;
  }
`;

const ColumnHeader = styled.th`
`;

const DataLink = styled(Link)`
  display: contents;
  text-decoration: none !important;
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
  DataLink,
};
