import styled from 'styled-components';

import {
  DARK_BLUE,
  SKY_BLUE,
  WHITE,
} from '../../../globalStyles';

const FormContainer = styled.div`
  background: ${DARK_BLUE};
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const TabListAnchor = styled.a`
  text-decoration: none;
  color: #1AB188;
  transition: 0.5s ease;
  background: ${WHITE};
  color: #CCC;
  font-size: 20px;
  float: left;
  width: 50%;
  text-align: center;
  border: 1px solid ${DARK_BLUE};
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: ${SKY_BLUE};
    color: ${WHITE};
  }
`;

module.exports = {
  FormContainer,
  TabList,
  TabListAnchor,
};
