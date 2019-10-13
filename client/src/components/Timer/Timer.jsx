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
  const remainingSecondsString = String(remainingSeconds);
  const adjustedSecondsString = (
    remainingSecondsString.length < 2 
      ? `0${remainingSecondsString}`
      : remainingSecondsString
  );
  return (`${minutesString}:${adjustedSecondsString}`);
}

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timeLeft: null,
    };
  }

  componentDidMount() {
    const { expiryTime } = this.props;
    const now = Date.now();
    this.setState({ timeLeft: expiryTime - now }, () => {
      this.startTimer();
    });
  }

  startTimer() {
    setInterval(() => {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft - 1000,
      }));
    }, 1000);
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
