'use client';

import { timers } from "@/constants";
import { useTheme } from "next-themes";
import { SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";

interface TimerContextProps {
  ticking: boolean;
  setTicking: React.Dispatch<SetStateAction<boolean>>;
  isTimeUp: boolean;
  setIsTimeUp: React.Dispatch<SetStateAction<boolean>>;
  pomodoro: number;
  setPomodoro: React.Dispatch<SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<SetStateAction<number>>;
  seconds: number;
  setSeconds: React.Dispatch<SetStateAction<number>>;
  stage: number;
  setStage: React.Dispatch<SetStateAction<number>>;
  pastStages: number[];
  setPastStages: React.Dispatch<SetStateAction<number[]>>;
  clockTicking: () => void;
  startTimer: () => void;
  switchStage: (index: number, forcePass?: boolean) => void;
  getTickingTime: () => any;
}

const TimerContext = createContext({} as TimerContextProps);

export const TimerContextProvider = ({ children }: any) => {
  const {
    pomodoroPattern
  } = timers;
  const {
    theme,
    setTheme,
  } = useTheme();

  const [ ticking, setTicking ] = useState<boolean>(false);
  const [ isTimeUp, setIsTimeUp ] = useState<boolean>(false);

  const [ pomodoro, setPomodoro ] = useState<number>(27);
  const [ shortBreak, setShortBreak ] = useState<number>(5);
  const [ longBreak, setLongBreak ] = useState<number>(10);
  const [ seconds, setSeconds ] = useState<number>(0);
  const [ stage, setStage ] = useState<number>(0);
  const [ pastStages, setPastStages] = useState<number[]>([]);

  const reset = () => {
    setTicking(false);
    setPomodoro(Number(sessionStorage.getItem('pomodoro')));
    setShortBreak(Number(sessionStorage.getItem('shortbreak')));
    setLongBreak(Number(sessionStorage.getItem('longbreak')));
    setSeconds(0);
  }

  const switchStage = useCallback((index: number, forcePass?: boolean) => {
    if (forcePass === true) {
      reset();
      setStage(index);
    } else {
      const isYes = 
      (pomodoro !== Number(sessionStorage.getItem('pomodoro'))
      || shortBreak !== Number(sessionStorage.getItem('shortbreak'))
      || longBreak !== Number(sessionStorage.getItem('longbreak'))) && stage !== index ? confirm('Are you sure?') : false;

      if (isYes === true) {
        reset();
        setStage(index);
      } else if (
        (pomodoro === Number(sessionStorage.getItem('pomodoro'))
        && shortBreak === Number(sessionStorage.getItem('shortbreak'))
        && longBreak === Number(sessionStorage.getItem('longbreak'))) && seconds === 0 && stage !== index
      ) {
        setStage(index);
      }
    }
  }, [longBreak, pomodoro, seconds, shortBreak, stage]);

  const getTickingTime = useCallback(() => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    }
    return (timeStage as any)[stage];
  }, [longBreak, pomodoro, shortBreak, stage]);

  const updateMinutes = useCallback(() => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    }
    return (updateStage as any)[stage];
  }, [stage]);

  const timeUp = useCallback(async () => {
    setIsTimeUp(true);
    setPastStages((pastNumbers) => pastNumbers.length > 0 ? [...pastNumbers, stage] : [stage]);
    reset();
    // I need to change this bunch of if/else statements. And create an algorithm that makes it in a more efficient way.
    if ((stage === 1 || stage === 2) && pastStages.length === 0) {
      switchStage(0, true);
      setPastStages([]);
    } else {
      if (pastStages.length < pomodoroPattern.length) {
        switchStage(pomodoroPattern[pastStages.length], true);
      } else {
        switchStage(0, true);
        setPastStages([]);
      }
    }
  }, [pastStages.length, pomodoroPattern, stage, switchStage]);

  const clockTicking = useCallback(() => {
    setIsTimeUp(false);
    const minutes = getTickingTime();
    const setMinutes = updateMinutes();

    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute: number) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  }, [getTickingTime, seconds, timeUp, updateMinutes]);

  const muteAlarm = () => {
    // The Logic to mute the Alarm
  }

  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  }

  useEffect(() => {
    if (sessionStorage.getItem('pomodoro') === null ||
    sessionStorage.getItem('shortbreak') === null ||
    sessionStorage.getItem('longbreak') === null) {
      sessionStorage.setItem('pomodoro', '25');
      sessionStorage.setItem('shortbreak', '5');
      sessionStorage.setItem('longbreak', '10');
      setTheme('dark');
    }

    setPomodoro(Number(sessionStorage.getItem('pomodoro')));
    setShortBreak(Number(sessionStorage.getItem('shortbreak')));
    setLongBreak(Number(sessionStorage.getItem('longbreak')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (ticking) clockTicking();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking, clockTicking]);

  useEffect(() => {
    if (theme?.includes('light')) {
      if (stage === 0) {
        setTheme('light');
      } else if (stage === 1) {
        setTheme('lightshortbreak');
      } else if (stage === 2) {
        setTheme('lightlongbreak');
      }
    } else {
      if (stage === 0) {
        setTheme('dark');
      } else if (stage === 1) {
        setTheme('darkshortbreak');
      } else if (stage === 2) {
        setTheme('darklongbreak');
      }
    }
  }, [stage, setStage, theme, setTheme]);

  return (
    <TimerContext.Provider value={{
      ticking,
      setTicking,
      isTimeUp,
      setIsTimeUp,
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
      pastStages,
      setPastStages,
      clockTicking,
      startTimer,
      switchStage,
      getTickingTime
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimerContext = () => useContext(TimerContext);
