import { timers } from "@/constants";
import { useState } from "react";
import { IUseTimer } from "./types";

export const useTimer = (): IUseTimer => {
  const {
    initialPomodoro,
    initialShortBreak,
    initialLongBreak
  } = timers;

  const [ ticking, setTicking ] = useState<boolean>(false);

  const [ pomodoro, setPomodoro ] = useState<number>(initialPomodoro);
  const [ shortBreak, setShortBreak ] = useState<number>(initialShortBreak);
  const [ longBreak, setLongBreak ] = useState<number>(initialLongBreak);
  const [ seconds, setSeconds ] = useState<number>(0);
  const [ stage, setStage ] = useState<number>(0);

  const switchStage = (index: number) => {
    const isYes = 
      (pomodoro !== initialPomodoro
      || shortBreak !== initialShortBreak
      || longBreak !== initialLongBreak) && stage !== index ? confirm('Are you sure?') : false;
    
    if (isYes === true) {
      reset();
      setStage(index);
    } else if (
      (pomodoro === initialPomodoro
      && shortBreak === initialShortBreak 
      && longBreak === initialLongBreak) && stage !== index
    ) {
      setStage(index);
    }
  }

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    }
    return (timeStage as any)[stage];
  }

  const updateMinutes = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    }
    return (updateStage as any)[stage];
  }

  const reset = () => {
    setTicking(false);
    setPomodoro(initialPomodoro);
    setShortBreak(initialShortBreak);
    setLongBreak(initialLongBreak);
    setSeconds(0);
  }

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinutes();

    if (minutes === 0 && seconds === 0) {
      reset();
    } else if (seconds === 0) {
      setMinutes((minute: number) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  }

  return {
    ticking,
    setTicking,
    pomodoro,
    setPomodoro,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    seconds,
    setSeconds,
    stage,
    setStage,
    switchStage,
    getTickingTime,
    updateMinutes,
    reset,
    clockTicking,
  };
}
