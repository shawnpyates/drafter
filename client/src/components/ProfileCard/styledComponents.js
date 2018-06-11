import styled from 'styled-components';

const InfoWrapper = styled.div`
  background: #fff;
  width: 45%;
  min-width: 475px;
  margin: 2em auto;
  padding-top: 1em;
  border-radius: 2px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.24);
`;

const InfoTitle = styled.h4`
  text-align: center;
  font-size: 20px;
  color: #555;
  font-weight: bolder;
  margin-bottom: 25px;
  margin-left: 35px;
  display: inline-block;
`;

const EditButton = styled.a`
  background: #11133F;
  float: right;
  padding: .5em;
  height: 25px;
  width: 80px;
  border-radius: 20px;
  text-align: center;
  font-weight: 500;
  color: #FFF;
  margin-right: 40px;
  line-height: 10px;

  &:hover {
    color: #7EC0EE;
    text-decoration: none;
  }
`;

const InfoDetails = styled.div`
  width: 92%;
  font-weight: 300;
`;

const InfoProperties = styled.ul`
  position: relative;
  float: left;
  margin-left: 0;
  text-align: left;
  padding-bottom: 1em;
  list-style: none;
`;

const InfoValues = styled.ul`
  position: relative;
  text-align: right;
  padding-bottom: 1em;
  list-style: none;
`;

const ListItem = styled.li`
  color: #999;
  margin-bottom: 8px;
  padding: 1px 0px 8px 0px;
  border-bottom: 1px solid #f1f1f1;
`;

module.exports = {
  InfoWrapper,
  InfoTitle,
  EditButton,
  InfoDetails,
  InfoProperties,
  InfoValues,
  ListItem,
};
