import '../../styles/timer.component.css';
import { useTimerContext } from "@/contexts";
import { ToggleTimers } from "./ToggleTimers";

export const Timer = () => {
  const {
    ticking,
    seconds,
    getTickingTime,
  } = useTimerContext();

  const minutes = getTickingTime();

  return (
    <div>
      <ToggleTimers />
      <h1
        className={`font-roboto ${ticking ? 'font-black' : 'font-thin'} text-[226px] md:text-[256px] lg:md:text-[256px] text-center leading-[85%] text-red-900 mt-9`}
      >
        {minutes.toString().padStart(2, '0')}
        <br />
        {seconds.toString().padStart(2, '0')}
      </h1>
    </div>
  );
}