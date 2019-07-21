/* global describe, expect, test */
import {
  addTimeChar,
  deleteTimeChar,
  formatTimeChars,
  get24HourTime,
  isInvalidTimeInput,
  TEST_ONLY as testOnlyFns,
} from '../timeInputHandlers';

const {
  areFirstTwoCharsInvalid,
  isFourthCharNotPermitted,
} = testOnlyFns;

describe('timeInputHandlers', () => {
  describe('get24HourTime', () => {
    test('prepends hour with zero if hour < 10', () => {
      const timeString = '2:45';
      const isPm = false;
      const received = get24HourTime(timeString, isPm);
      const expected = '02:45';
      expect(received).toEqual(expected);
    });
    test('leaves hour in tact if hour is 10AM or 11AM', () => {
      const timeString = '10:45';
      const isPm = false;
      const received = get24HourTime(timeString, isPm);
      const expected = '10:45';
      expect(received).toEqual(expected);
    });
    test('if hour is 12AM, change hour value to 00', () => {
      const timeString = '12:45';
      const isPm = false;
      const received = get24HourTime(timeString, isPm);
      const expected = '00:45';
      expect(received).toEqual(expected);
    });
    test('if PM (but not 12 PM), add 12 to hour value', () => {
      const timeString = '8:45';
      const isPm = true;
      const received = get24HourTime(timeString, isPm);
      const expected = '20:45';
      expect(received).toEqual(expected);
    });
    test('if 12 PM, leave value in tact', () => {
      const timeString = '12:45';
      const isPm = true;
      const received = get24HourTime(timeString, isPm);
      const expected = '12:45';
      expect(received).toEqual(expected);
    });
  });
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
  describe('formatTimeChars', () => {
    test('returns full values if hours column >= 10', () => {
      const timeChars = ['1', '0', ':', '3', '0'];
      const received = formatTimeChars(timeChars);
      const expected = '10:30';
      expect(received).toEqual(expected);
    });
    test('disregards first slot if hours column < 10', () => {
      const timeChars = ['-', '9', ':', '3', '0'];
      const received = formatTimeChars(timeChars);
      const expected = '9:30';
      expect(received).toEqual(expected);
    });
  });
  describe('isInvalidTimeInput', () => {
    test('rejects inputs that are not numbers', () => {
      const key = 'a';
      const timeChars = ['-', '-', ':', '-', '-'];
      const received = isInvalidTimeInput(key, timeChars);
      expect(received).toBe(true);
    });
    test('rejects input if all slots are full', () => {
      const key = '1';
      const timeChars = ['1', '0', ':', '3', '0'];
      const received = isInvalidTimeInput(key, timeChars);
      expect(received).toBe(true);
    });
  });
});
