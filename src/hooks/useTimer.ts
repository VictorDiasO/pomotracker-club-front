import { timers } from "@/constants";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { IUseTimer } from "./types";

export const useTimer = (): IUseTimer => {
  const {
    initialPomodoro,
    initialShortBreak,
    initialLongBreak,
    pomodoroPattern
  } = timers;
  const alarmRef: LegacyRef<HTMLAudioElement> = useRef<any>();

  const [ ticking, setTicking ] = useState<boolean>(false);
  const [ isTimeUp, setIsTimeUp ] = useState<boolean>(false);

  const [ pomodoro, setPomodoro ] = useState<number>(27);
  const [ shortBreak, setShortBreak ] = useState<number>(5);
  const [ longBreak, setLongBreak ] = useState<number>(10);
  const [ seconds, setSeconds ] = useState<number>(0);
  const [ stage, setStage ] = useState<number>(0);
  const [ pastStages, setPastStages] = useState<number[]>([]);

  const switchStage = (index: number, forcePass?: boolean) => {
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
        && longBreak === Number(sessionStorage.getItem('longbreak'))) && stage !== index
      ) {
        setStage(index);
      }
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

  const timeUp = async () => {
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
  }

  const reset = () => {
    setTicking(false);
    setPomodoro(initialPomodoro);
    setShortBreak(initialShortBreak);
    setLongBreak(initialLongBreak);
    setSeconds(0);
  }

  const clockTicking = () => {
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
  }

  const muteAlarm = () => {
    // The Logic to mute the Alarm
  }

  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  }

  /* Im just commenting it because I want to find a way to run this useEffect only here and not on the pages that import the useTimer Hook
  useEffect(() => {
    console.log('Running');
    const timer = setInterval(() => {
      if (ticking) clockTicking();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking, setTicking, clockTicking]);
  */

  useEffect(() => {
    if (!sessionStorage.getItem('pomodoro') ||
    !sessionStorage.getItem('shortbreak') ||
    !sessionStorage.getItem('longbreak')) {
      sessionStorage.setItem('pomodoro', '25');
      sessionStorage.setItem('shortbreak', '5');
      sessionStorage.setItem('longbreak', '10');
    }

    setPomodoro(Number(sessionStorage.getItem('pomodoro')));
    setShortBreak(Number(sessionStorage.getItem('shortbreak')));
    setLongBreak(Number(sessionStorage.getItem('longbreak')));
  }, []);

  useEffect(() => {
    console.log(pastStages);
  }, [pastStages, setPastStages]);

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
    alarmRef,
    isTimeUp,
    setIsTimeUp,
    muteAlarm,
    startTimer
  };
}
