import moment from 'moment';

const MAX_HOURS_COLUMN_VALUE = 23;
const INITIAL_TIME_CHARS = ['-', '-', ':', '-', '-'];

const get24HourTime = (timeString, isPm) => {
  const hourColumn = timeString.split(':')[0];
  if (Number(hourColumn) === 12 && !isPm) {
    return timeString.replace(hourColumn, '00');
  }
  if (Number(hourColumn) !== 12 && isPm) {
    return timeString.replace(hourColumn, String(Number(hourColumn) + 12));
  }
  const twoCharHourColumn = Number(hourColumn < 10) ? `0${hourColumn}` : hourColumn;
  return timeString.replace(hourColumn, twoCharHourColumn);
};

const createFinalTimestamp = (date, time) => date.replace('T12:00:00', ` ${time}:00`);

// allow 06-09 and 16-19 (valid hour values)
// allow x1-x5 (e.g. 95 if user wants 9:50)
// do not allow x6-x9 where x > 1 (e.g. 29, 39, 49, etc.)
// because both 29:00 and 2:90 are invalid times
const areFirstTwoCharsInvalid = (inputChar, timeChars) => (
  Number(`${timeChars[4]}${inputChar}`) > MAX_HOURS_COLUMN_VALUE && inputChar > 5
);

const isFourthCharNotPermitted = timeChars => (
  Number(`${timeChars[1]}${timeChars[3]}`) > MAX_HOURS_COLUMN_VALUE
  || (timeChars[1] !== '-' && timeChars[4] !== '-' && timeChars[4] > 5)
);

const addTimeChar = (timeChars, inputChar) => {
  const clonedTimeChars = [...timeChars];
  clonedTimeChars.push(inputChar);
  if (clonedTimeChars[3] !== '-') {
    if (clonedTimeChars[1] !== '-') {
      const tensDigit = clonedTimeChars[1];
      clonedTimeChars[0] = tensDigit;
    }
    const onesDigit = clonedTimeChars[3];
    clonedTimeChars[1] = onesDigit;
  }
  clonedTimeChars.splice(clonedTimeChars.indexOf(':'), 1);
  clonedTimeChars[2] = ':';
  return clonedTimeChars;
};

const deleteTimeChar = (timeChars) => {
  const clonedTimeChars = [...timeChars];
  clonedTimeChars.pop();
  clonedTimeChars.unshift('-');
  clonedTimeChars.splice(clonedTimeChars.indexOf(':'), 1);
  clonedTimeChars.splice(2, 0, ':');
  return clonedTimeChars;
};

const formatTimeChars = timeChars => (
  timeChars[0] === '-' || timeChars[0] === '0'
    ? timeChars.slice(1).join('')
    : timeChars.join('')
);

const isInvalidTimeInput = (key, timeChars) => (
  Number.isNaN(Number(key))
  || timeChars[0] !== '-'
  || (timeChars[3] === '-' && areFirstTwoCharsInvalid(key, timeChars))
  || isFourthCharNotPermitted(timeChars)
);

const resetTimeValues = () => ({
  calendarDate: null,
  timeChars: INITIAL_TIME_CHARS,
  timeCharsAsString: null,
});

const initializeDateAndTime = () => ({
  calendarDate: moment(),
  timeChars: INITIAL_TIME_CHARS,
});

const convertTo12HourFormat = (timeString) => {
  const hourColumn = Number(timeString.split(':')[0]);
  if (hourColumn === 0) {
    return {
      timeCharsAsString: timeString.replace(hourColumn, 12),
      isPmSelected: false,
    };
  }
  if (hourColumn > 12) {
    return {
      timeCharsAsString: timeString.replace(hourColumn, hourColumn - 12),
      isPmSelected: true,
    };
  }
  return { timeCharsAsString: timeString };
};

const createInputsFromExistingTimeVals = (timeScheduled) => {
  const date = new Date(timeScheduled);
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const minutesRepaired = minutes.length > 1 ? minutes : `0${minutes}`;
  const { timeCharsAsString, isPmSelected } = convertTo12HourFormat(`${hours}:${minutesRepaired}`);
  // time char input requires 5 chars -- if hours column is single digit, add 0 to front
  const timeChars = (
    timeCharsAsString.length > 4
      ? timeCharsAsString.split('')
      : ['0', ...timeCharsAsString.split('')]
  );
  return {
    calendarDate: moment(timeScheduled),
    timeCharsAsString,
    timeChars,
    isTimePickerEnabled: true,
    isPmSelected: isPmSelected || false,
  };
};

module.exports = {
  addTimeChar,
  convertTo12HourFormat,
  createFinalTimestamp,
  createInputsFromExistingTimeVals,
  deleteTimeChar,
  formatTimeChars,
  get24HourTime,
  initializeDateAndTime,
  isInvalidTimeInput,
  resetTimeValues,
  TEST_ONLY: {
    areFirstTwoCharsInvalid,
    isFourthCharNotPermitted,
  },
};
