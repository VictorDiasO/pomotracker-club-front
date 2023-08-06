import { Dispatch, SetStateAction } from "react";

interface ITimer {
  stage: number;
  switchStage: (index: number) => void;
  pomodoro: number;
  seconds: number;
  getTickingTime: () => any;
  ticking: boolean;
  setTicking: Dispatch<SetStateAction<boolean>>;
}

export const Timer = ({ seconds, getTickingTime }: ITimer) => {
  const minutes = getTickingTime();
  return (
    <h1 className="font-roboto font-thin text-[256px] text-center leading-[85%] w-[95%] md:w-[20%] text-red-900">
      {minutes.toString().padStart(2, '0')} {seconds.toString().padStart(2, '0')}
    </h1>
  );
}