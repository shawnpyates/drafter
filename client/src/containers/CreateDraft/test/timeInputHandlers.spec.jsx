/* global describe, expect, test */
import {
  addTimeChar,
  areFirstTwoCharsInvalid,
  deleteTimeChar,
  isFourthCharNotPermitted,
} from '../timeInputHandlers';

describe('timeInputHandlers', () => {
  describe('areFirstTwoCharsInvalid', () => {
    // allow 6-9 and 16-19 (valid hour values)
    test('allow inputChar >= 6 if timeChars[4] is <= 1', () => {
      const inputChar = '9';
      const timeChars = ['-', '-', ':', '-', '1'];
      const received = areFirstTwoCharsInvalid(inputChar, timeChars);
      expect(received).toBe(false);
    });
    // allow x1-x5 (e.g 95 if user wants 9:50)
    test('allows inputChar equal or less than 5', () => {
      const inputChar = '5';
      const timeChars = ['-', '-', ':', '-', '9'];
      const received = areFirstTwoCharsInvalid(inputChar, timeChars);
      expect(received).toBe(false);
    });
    // do not allow x6-x9 where x > 1 (e.g. 29, 39, 49, etc.)
    // because both 29:00 and 2:90 are invalid times
    test('does not allows inputChar between 6-9 if timeChars[4] > 1', () => {
      const inputChar = '9';
      const timeChars = ['-', '-', ':', '-', '2'];
      const received = areFirstTwoCharsInvalid(inputChar, timeChars);
      expect(received).toBe(true);
    });
  });
  describe('isFourthCharNotPermitted', () => {
    // allow 12:3x
    test('allow 4th char that creates valid time', () => {
      const timeChars = ['-', '1', ':', '2', '3'];
      const received = isFourthCharNotPermitted(timeChars);
      expect(received).toBe(false);
    });
    // do not allow 25:1x
    test('do not allow 4th char that causes hours > 23', () => {
      const timeChars = ['-', '2', ':', '5', '1'];
      const received = isFourthCharNotPermitted(timeChars);
      expect(received).toBe(true);
    });
    // do not allow 12:6x
    test('do not allow 4th char that causes minutes > 59', () => {
      const timeChars = ['-', '1', ':', '2', '6'];
      const received = isFourthCharNotPermitted(timeChars);
      expect(received).toBe(true);
    });
  });
  describe('addTimeChar', () => {
    test('first char inserted goes into final slot', () => {
      const timeChars = ['-', '-', ':', '-', '-'];
      const inputChar = '1';
      const received = addTimeChar(timeChars, inputChar);
      const expected = ['-', '-', ':', '-', '1'];
      expect(received).toEqual(expected);
    });
    test('char pushes all existing values to left, skipping over colon', () => {
      const timeChars = ['-', '1', ':', '2', '3'];
      const inputChar = '4';
      const received = addTimeChar(timeChars, inputChar);
      const expected = ['1', '2', ':', '3', '4'];
      expect(received).toEqual(expected);
    });
  });
  describe('deleteTimeChar', () => {
    test('removes final value, pulling other values one slot to right', () => {
      const timeChars = ['1', '2', ':', '3', '4'];
      const received = deleteTimeChar(timeChars);
      const expected = ['-', '1', ':', '2', '3'];
      expect(received).toEqual(expected);
    });
    test('leaves all slots empty if only final slot has value', () => {
      const timeChars = ['-', '-', ':', '-', '1'];
      const received = deleteTimeChar(timeChars);
      const expected = ['-', '-', ':', '-', '-'];
      expect(received).toEqual(expected);
    });
  });
});
