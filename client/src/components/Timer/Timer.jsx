import React, { Component } from 'react';

import {
  TimerRow,
  TimerContainer,
  TimerText,
} from './styledComponents';

const msToMinutesAndSeconds = (ms) => {
  const seconds = parseInt(ms / 1000);
  const minutesString = String(parseInt(seconds / 60));
  const remainingSeconds = seconds % 60;
  const secondsString = (
    remainingSeconds < 10
      ? `0${String(remainingSeconds)}`
      : String(remainingSeconds)
  );
  return (`${minutesString}:${secondsString}`);
};

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timeLeft: null,
    };
  }

  componentDidMount() {
    this.setTimer(this.props.expiryTime);
  }

  componentDidUpdate(prevProps) {
    const { expiryTime } = this.props;
    if (expiryTime !== prevProps.expiryTime) {
      this.stopTimer();
      this.setTimer(expiryTime);
    }
  }

  setTimer(expiryTime) {
    const now = Date.now();
    this.setState({ timeLeft: expiryTime - now }, () => {
      this.startTimer();
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      const timeMinusOneSecond = this.state.timeLeft - 1000;
      if (timeMinusOneSecond <= 0) {
        this.handleExpiry();
      } else {
        this.setState({ timeLeft: timeMinusOneSecond });
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  handleExpiry() {
    this.stopTimer();
    this.setState({ timeLeft: 0 });
    this.props.assignPlayerToTeam();
  }

  render() {
    return (
      <TimerRow>
        <TimerContainer>
          <TimerText>
            {msToMinutesAndSeconds(this.state.timeLeft)}
          </TimerText>
        </TimerContainer>
      </TimerRow>
    );
  }
};

export default Timer;
