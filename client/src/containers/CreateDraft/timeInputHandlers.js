const MAX_HOURS_COLUMN_VALUE = 23;

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
// allow x1-x5 (e.g 95 if user wants 9:50)
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

module.exports = {
  get24HourTime,
  createFinalTimestamp,
  areFirstTwoCharsInvalid,
  isFourthCharNotPermitted,
  addTimeChar,
  deleteTimeChar,
  formatTimeChars,
  isInvalidTimeInput,
};
