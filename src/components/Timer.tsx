import { timers } from "@/constants";

interface ITimer {
  seconds: number;
  getTickingTime: () => any;
  ticking: boolean;
  stage: number;
  switchStage: (index: number) => void;
}

export const Timer = ({ seconds, getTickingTime, ticking, stage, switchStage }: ITimer) => {
  const { availableTimers } = timers;
  const minutes = getTickingTime();

  return (
    <div>
      <div className="flex flex-row gap-4">
        {availableTimers.map((timer, index) => {
          return (
            <button
              className={`font-roboto font-thin ml-2 p-2 ${stage === index ? 'bg-red-400' : 'bg-red-200'} rounded-md`}
              key={index}
              onClick={() => switchStage(index)}
            >
              {timer}
            </button>
          );
        })}
      </div>
      <h1
        className={`font-roboto ${ticking ? 'font-extrabold' : 'font-thin'} text-[256px] text-center leading-[85%] text-red-900 mt-9`}
      >
        {minutes.toString().padStart(2, '0')}
        <br />
        {seconds.toString().padStart(2, '0')}
      </h1>
    </div>
  );
}