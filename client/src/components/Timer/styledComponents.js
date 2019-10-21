import styled from 'styled-components';

import { mixins, styleVars } from '../../styles';

const {
  CENTER_ELEMENT_MIXIN,
  VERTICALLY_CENTER_CONTENT_MIXIN,
} = mixins;

const {
  DARK_BLUE,
  DARK_GRAY,
  NORMAL_FONT_SIZE,
} = styleVars;

const TIMER_HEIGHT = '2rem';

const TimerRow = styled.div`
  width: 100%;
  height: ${TIMER_HEIGHT};
  margin-bottom: 2em;
`;

const TimerContainer = styled.div`
  text-align: center;
  width: 10%;
  padding: 3rem;
  border-radius: 2px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid ${DARK_GRAY};
  height: ${TIMER_HEIGHT};

  ${CENTER_ELEMENT_MIXIN}
  ${VERTICALLY_CENTER_CONTENT_MIXIN}
`;

const TimerText = styled.p`
  color: ${DARK_BLUE};
  font-size: ${NORMAL_FONT_SIZE};
`;

module.exports = {
  TimerRow,
  TimerContainer,
  TimerText,
};
