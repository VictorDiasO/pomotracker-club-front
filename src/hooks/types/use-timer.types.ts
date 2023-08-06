import { Dispatch, SetStateAction } from "react";

export interface IUseTimer {
  pomodoro: number;
  setPomodoro: Dispatch<SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: Dispatch<SetStateAction<number>>;
  longBreak: number;
  setLongBreak: Dispatch<SetStateAction<number>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
}