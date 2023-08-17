import { timers } from "@/constants";
import '../../styles/timer.component.css';

interface ITimer {
  seconds: number;
  getTickingTime: () => any;
  ticking: boolean;
  stage: number;
  switchStage: (index: number) => void;
  theme: string | undefined
}

export const Timer = ({ seconds, getTickingTime, ticking, stage, switchStage, theme }: ITimer) => {
  const { availableTimers } = timers;
  const minutes = getTickingTime();

  return (
    <div>
      <div className="flex flex-row gap-4">
        {availableTimers.map((timer, index) => {
          return (
            <button
              className={`
                ${theme === 'light' && `font-roboto font-bold ml-2 p-2 ${stage === index ? 'bg-red-400' : 'bg-red-200'} rounded-md`}
                ${theme === 'lightshortbreak' && `font-roboto font-bold ml-2 p-2 ${stage === index ? 'bg-green-400' : 'bg-green-200'} rounded-md`}
                ${theme === 'lightlongbreak' && `font-roboto font-bold ml-2 p-2 ${stage === index ? 'bg-blue-400' : 'bg-blue-200'} rounded-md`}
                ${theme === 'dark' && `font-roboto font-bold ml-2 p-2 ${stage === index ? 'bg-red-500 bg-opacity-75' : 'bg-red-500 bg-opacity-25'} rounded-md`}
                ${theme === 'darkshortbreak' && `font-roboto font-bold ml-2 p-2 ${stage === index ? 'bg-red-500 bg-opacity-75' : 'bg-red-500 bg-opacity-25'} rounded-md`}
              `}
              key={index}
              onClick={() => switchStage(index)}
            >
              {timer}
            </button>
          );
        })}
      </div>
      <h1
        className={`font-roboto ${ticking ? 'font-black' : 'font-thin'} text-[256px] text-center leading-[85%] text-red-900 mt-9`}
      >
        {minutes.toString().padStart(2, '0')}
        <br />
        {seconds.toString().padStart(2, '0')}
      </h1>
    </div>
  );
}