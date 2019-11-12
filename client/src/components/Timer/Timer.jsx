import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  TimerRow,
  TimerContainer,
  TimerText,
} from './styledComponents';

const msToMinutesAndSeconds = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutesString = String(Math.floor(seconds / 60));
  const remainingSeconds = seconds % 60;
  const secondsString = (
    remainingSeconds < 10
      ? `0${String(remainingSeconds)}`
      : String(remainingSeconds)
  );
  return (`${minutesString}:${secondsString}`);
};

function Timer({
  assignPlayerToTeam,
  expiryTime,
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (timeLeft && (timeLeft - 1000 <= 0)) {
      setTimeLeft(0);
      setIsActive(false);
      assignPlayerToTeam();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (expiryTime) {
      const now = Date.now();
      setTimeLeft(expiryTime - now);
      setIsActive(true);
    }
  }, [expiryTime]);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <TimerRow>
      <TimerContainer>
        <TimerText>
          {msToMinutesAndSeconds(timeLeft)}
        </TimerText>
      </TimerContainer>
    </TimerRow>
  );
}

Timer.propTypes = {
  assignPlayerToTeam: PropTypes.func.isRequired,
  expiryTime: PropTypes.number.isRequired,
};

export default Timer;
