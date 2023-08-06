import { timers } from "@/constants";
import { useState } from "react";
import { IUseTimer } from "./types";

export const useTimer = () => {
  const {
    initialPomodoro,
    initialShortBreak,
    initialLongBreak
  } = timers;

  const [ pomodoro, setPomodoro ] = useState<number>(initialPomodoro);
  const [ shortBreak, setShortBreak ] = useState<number>(initialShortBreak);
  const [ longBreak, setLongBreak ] = useState<number>(initialLongBreak);
  const [ seconds, setSeconds ] = useState<number>(0);
  const [ stage, setStage ] = useState<number>(0);

  return {
    pomodoro,
    setPomodoro,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    seconds,
    setSeconds,
    stage,
    setStage
  } as IUseTimer;
}
