import { Dispatch, SetStateAction } from "react";

export interface IUseTimer {
  initialPomodoro: number;
  setInitialPomodoro: Dispatch<SetStateAction<number>>;
  initialShortBreak: number;
  setInitialShortBreak: Dispatch<SetStateAction<number>>;
  initialLongBreak: number;
  setInitialLongBreak: Dispatch<SetStateAction<number>>;
  ticking: boolean;
  setTicking: Dispatch<SetStateAction<boolean>>;
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
  switchStage: (index: number) => void;
  getTickingTime: () => any;
  updateMinutes: () => any;
  reset: () => void;
  clockTicking: () => void;
  alarmRef: any;
  isTimeUp: boolean;
  setIsTimeUp: Dispatch<SetStateAction<boolean>>;
  muteAlarm: () => void;
  startTimer: () => void;
}