import { SetStateAction } from "react";

export interface TimerContextProps {
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
  resetActualTimer: () => void;
}