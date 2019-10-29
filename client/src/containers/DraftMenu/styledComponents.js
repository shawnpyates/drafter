import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  DARK_BLUE,
  LIGHT_GRAY,
  WHITE,
  LARGE_FONT_SIZE,
} = styleVars;

const {
  CENTER_ELEMENT_MIXIN,
  MENU_TEXT_MIXIN,
  VERTICALLY_CENTER_CONTENT_MIXIN,
} = mixins;

const BlurContainer = styled.div`
  filter: ${props => (props.shouldDraftViewBlur ? 'blur(5px)' : 'unset')};
  background-color: ${props => (props.shouldDraftViewBlur ? LIGHT_GRAY : 'unset')};
`;

const DraftMenuContainer = styled.div`
  width: ${props => (props.isWide ? '100%' : '60%')};
  
  ${MENU_TEXT_MIXIN({ color: DARK_BLUE })}
  ${CENTER_ELEMENT_MIXIN}
`;

const InfoContainer = styled.div`
  height: 5rem;
  background: ${WHITE};
  padding: 3rem;
  text-align: center;

  ${VERTICALLY_CENTER_CONTENT_MIXIN}
`;

const InfoText = styled.p`
  color: ${DARK_BLUE};
  font-size: ${LARGE_FONT_SIZE};
`;

module.exports = {
  BlurContainer,
  DraftMenuContainer,
  InfoContainer,
  InfoText,
};
