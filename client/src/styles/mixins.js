import {
  DARK_BLUE,
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
  PICKER_WRAPPER_MIXIN: props => `
    position: absolute;
    width: 30%;
    ${props.side}: 15%;
  `,
  PICKER_INPUT_MIXIN: `
    color: ${DARK_BLUE};
    font-size: ${NORMAL_FONT_SIZE};
    text-align: center;
    font-weight: 400;
    padding: 0;
  `,
};
