import {
  SMALL_FONT_SIZE,
  NORMAL_FONT_SIZE,
  DEFAULT_FONT,
} from './styleVars';

module.exports = {
  P_TEXT_MIXIN: props => `
    font-size: ${SMALL_FONT_SIZE};
    font-family: ${DEFAULT_FONT};
    color: ${props.color};
  `,
  HEADING_TEXT_MIXIN: props => `
    font-size: ${NORMAL_FONT_SIZE};
    font-family: ${DEFAULT_FONT};
    color: ${props.color};
  `,
};
