import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { styleVars } from '../../styles';


const {
  DARK_BLUE,
  LIGHT_GRAY,
  SKY_BLUE,
  WHITE,
} = styleVars;

const getRowColorOnHover = (props) => {
  if (props.optionsExists) {
    return (props.isEvenNumber ? LIGHT_GRAY : WHITE);
  }
  return SKY_BLUE;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const AddNewButton = styled.a`
  background: ${DARK_BLUE};
  float: right;
  height: 2.5rem;
  width: 13rem;
  border-radius: 2rem;
  text-align: center;
  font-weight: 500;
  color: ${WHITE};
  cursor: pointer;
  margin-right: 4rem;

  &:hover {
    color: ${SKY_BLUE};
    text-decoration: none;
  }
`;

const TableFrame = styled.table`
  margin: 5rem auto;
  text-align: center;
  width: 100%;
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
  cursor: ${props => (props.optionsExists ? 'default' : 'pointer')};

  &:hover {
    background-color: ${props => getRowColorOnHover(props)};
  }
`;

const ColumnHeader = styled.th`
  width: ${props => `${100 / props.columnHeadersLength}%`};
`;

const DataLink = styled(Link)`
  display: contents;
  text-decoration: none !important;
  cursor: inherit;
`;

const OptionsContainer = styled.td`

`;

const Option = styled.button`
  border: none;
  background: transparent;
  margin: auto 2rem;
  font-size: 0.5rem;
  cursor: pointer;
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
  OptionsContainer,
  Option,
};
