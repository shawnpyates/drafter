import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mixins, styleVars } from '../../styles';


const {
  DARK_BLUE,
  LIGHT_GRAY,
  SKY_BLUE,
  WHITE,
} = styleVars;

const { VERTICALLY_CENTER_CONTENT_MIXIN } = mixins;

const getRowColorOnHover = (props) => {
  if (props.optionsExists) {
    return (props.isEvenNumber ? LIGHT_GRAY : WHITE);
  }
  return SKY_BLUE;
};

const Container = styled.div`
  margin: 5rem auto;
  width: 100%;
`;

const TableButton = styled.div`
  background: ${DARK_BLUE};
  margin: auto 0.5rem;
  padding: 1rem;
  height: 2.5rem;
  border-radius: 2rem;
  text-align: center;
  font-weight: 500;
  color: ${WHITE};
  cursor: pointer;
  float: right;

  ${VERTICALLY_CENTER_CONTENT_MIXIN}

  &:hover {
    color: ${SKY_BLUE};
    text-decoration: none;
  }
`;

const TableTitleLine = styled.div`
  margin-bottom: 3.5rem;
`;

const TableTitle = styled.h3`
  display: inline;
`;

const HeaderRow = styled.div`
  display: table-header-group;
`;

const DataFrame = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;
  display: table;
`;

const EmptyDataMessage = styled.div`
  text-align: center;
`;

const DataRow = styled.div`
  display: table-row;
  background-color: ${props => (props.isEvenNumber ? LIGHT_GRAY : WHITE)};
  cursor: ${props => (props.optionsExists ? 'default' : 'pointer')};

  &:hover {
    background-color: ${props => getRowColorOnHover(props)};
  }
`;

const ColumnHeader = styled.div`
  display: table-cell;
  font-weight: 600;
  width: ${props => `${100 / props.columnHeadersLength}%`};
`;

const DataLink = styled(Link)`
  display: contents;
  text-decoration: none;
  cursor: inherit;
  color: ${DARK_BLUE};

  &:visited {
    color: ${DARK_BLUE};
  }
`;

const DataCell = styled.div`
  display: table-cell;
`;

const Option = styled.button`
  border: none;
  background: transparent;
  margin: auto 1rem;
  font-size: 0.5rem;
  cursor: pointer;
`;

module.exports = {
  ColumnHeader,
  Container,
  DataCell,
  DataFrame,
  DataLink,
  DataRow,
  EmptyDataMessage,
  HeaderRow,
  Option,
  TableButton,
  TableTitle,
  TableTitleLine,
};
