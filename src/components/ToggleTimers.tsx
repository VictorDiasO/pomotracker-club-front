import { timers } from "@/constants";
import { useTimerContext } from "@/contexts";
import { useTheme } from "next-themes";

export const ToggleTimers = () => {
  const { availableTimers } = timers;
  const {
    theme
  } = useTheme();
  const {
    stage,
    switchStage,
  } = useTimerContext();
  
  return (
    <div className="flex flex-row gap-5 items-center justify-center">
      {availableTimers.map((timer, index) => {
        return (
          <button
            className={`
              ${theme === 'light' && `font-roboto font-bold p-2 md:ml-2 lg:ml-2 ${stage === index ? 'bg-red-400' : 'bg-red-200'} rounded-md`}
              ${theme === 'lightshortbreak' && `font-roboto font-bold p-2 md:ml-2 lg:ml-2 ${stage === index ? 'bg-green-400' : 'bg-green-200'} rounded-md`}
              ${theme === 'lightlongbreak' && `font-roboto font-bold p-2 md:ml-2 lg:ml-2 ${stage === index ? 'bg-blue-400' : 'bg-blue-200'} rounded-md`}
              ${theme === 'dark' && `font-roboto font-bold p-2 md:ml-2 lg:ml-2 ${stage === index ? 'bg-red-700' : 'bg-red-500 bg-opacity-25'} rounded-md`}
              ${theme === 'darkshortbreak' && `font-roboto font-bold p-2 md:ml-2 lg:ml-2 ${stage === index ? 'bg-green-700' : 'bg-green-100 bg-opacity-10'} rounded-md text-[#F2FFF5]`}
              ${theme === 'darklongbreak' && `font-roboto font-bold p-2 md:ml-2 lg:ml-2 ${stage === index ? 'bg-blue-700' : 'bg-blue-100 bg-opacity-10'} rounded-md text-[#F2F9FF]`}
            `}
            key={index}
            onClick={() => switchStage(index)}
            aria-label={stage === index ? `Actual timer: ${timer}` : `Click and go to ${timer}`}
          >
            {timer}
          </button>
        );
      })}
    </div>
  );
}
