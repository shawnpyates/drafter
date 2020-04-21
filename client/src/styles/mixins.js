/* eslint indent: 0 */
import {
  DARK_BLUE,
  WHITE,
  SMALL_FONT_SIZE,
  NORMAL_FONT_SIZE,
} from './styleVars';

module.exports = {
  P_TEXT_MIXIN: props => `
    font-size: ${SMALL_FONT_SIZE};
    color: ${props.color};
  `,
  MENU_TEXT_MIXIN: props => `
    font-size: ${NORMAL_FONT_SIZE};
    color: ${props.color};
  `,
  PICKER_WRAPPER_MIXIN: props => `
    position: absolute;
    ${props.isCalendarFocused
      ? `
        top: -125%;
        z-index: 1000;
        ${props.side}: -10%;
        `
      : `
        width: 30%;
        ${props.side}: 15%
        `
    };
  `,
  PICKER_INPUT_MIXIN: `
    color: ${WHITE};
    background-color: ${DARK_BLUE};
    font-size: ${NORMAL_FONT_SIZE};
    text-align: center;
    font-weight: 400;
    padding: 0;
    cursor: pointer;

    &:focus {
      color: transparent;
      background-color: ${WHITE};
      text-shadow: 0 0 0 ${DARK_BLUE};
    }
  `,
  CENTER_ELEMENT_MIXIN: `
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `,
  VERTICALLY_CENTER_CONTENT_MIXIN: `
    display: flex;
    justify-content: center;
    flex-direction: column;
  `,
  DRAFT_SELECTION_LIST_ITEM_MIXIN: `
    border: 1px solid #000;
    margin: 2rem auto;
    text-align: center;
    font-size: 1.5rem;
    padding: 1rem;
    width: 65%;
    display: inline-block;
    position: relative;
    word-break: break-word;
  `,
};
