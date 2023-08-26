import { useTheme } from "next-themes";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";
import { useTimerContext } from "@/contexts";
import { ArrowCounterClockwise, CaretDoubleRight, DotsThreeOutline, Pause, Play } from "@phosphor-icons/react";

export const TimerController = () => {
  const {
    ticking,
    stage,
    switchStage,
    startTimer,
    resetActualTimer
  } = useTimerContext();

  const {
    theme
  } = useTheme();

  const [ openSettingsModal, setOpenSettingsModal ] = useState(false);

  const getColorBasedOnTheme = (): string => {
    if (theme === 'light') return '#471515';
    else if (theme === 'lightshortbreak') return '#14401D';
    else if (theme === 'lightlongbreak') return '#153047';
    return '#ddd';
  }

  return (
    <div className="flex items-center gap-4">
      {/* Settings */}
      <button
        className={`flex p-6 content-center items-center gap-4 rounded-3xl 
          ${theme === 'light' && 'bg-red-100'}
          ${theme === 'lightshortbreak' && 'bg-green-100'}
          ${theme === 'lightlongbreak' && 'bg-blue-100'}
          ${theme === 'dark' && 'bg-red-500 bg-opacity-20'}
          ${theme === 'darkshortbreak' && 'bg-green-100 bg-opacity-10'}
          ${theme === 'darklongbreak' && 'bg-blue-100 bg-opacity-10'}
        `}
        onClick={() => setOpenSettingsModal(!openSettingsModal)}
        aria-label="Button to open settings modal"
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M19.5 16C19.5 16.6922 19.2947 17.3689 18.9101 17.9445C18.5256 18.5201 17.9789 18.9687 17.3394 19.2336C16.6999 19.4985 15.9961 19.5678 15.3172 19.4327C14.6383 19.2977 14.0146 18.9644 13.5251 18.4749C13.0356 17.9854 12.7023 17.3617 12.5673 16.6828C12.4322 16.0039 12.5015 15.3001 12.7664 14.6606C13.0313 14.0211 13.4799 13.4744 14.0555 13.0899C14.6311 12.7053 15.3078 12.5 16 12.5C16.9272 12.5033 17.8156 12.8731 18.4712 13.5288C19.1269 14.1844 19.4967 15.0728 19.5 16ZM6 12.5C5.30777 12.5 4.63108 12.7053 4.0555 13.0899C3.47993 13.4744 3.03133 14.0211 2.76642 14.6606C2.50151 15.3001 2.4322 16.0039 2.56725 16.6828C2.7023 17.3617 3.03564 17.9854 3.52513 18.4749C4.01461 18.9644 4.63825 19.2977 5.31718 19.4327C5.99612 19.5678 6.69985 19.4985 7.33939 19.2336C7.97893 18.9687 8.52556 18.5201 8.91014 17.9445C9.29473 17.3689 9.5 16.6922 9.5 16C9.49671 15.0728 9.1269 14.1844 8.47123 13.5288C7.81557 12.8731 6.92724 12.5033 6 12.5ZM26 12.5C25.3078 12.5 24.6311 12.7053 24.0555 13.0899C23.4799 13.4744 23.0313 14.0211 22.7664 14.6606C22.5015 15.3001 22.4322 16.0039 22.5673 16.6828C22.7023 17.3617 23.0356 17.9854 23.5251 18.4749C24.0146 18.9644 24.6383 19.2977 25.3172 19.4327C25.9961 19.5678 26.6999 19.4985 27.3394 19.2336C27.9789 18.9687 28.5256 18.5201 28.9101 17.9445C29.2947 17.3689 29.5 16.6922 29.5 16C29.4967 15.0728 29.1269 14.1844 28.4712 13.5288C27.8156 12.8731 26.9272 12.5033 26 12.5Z" fill={getColorBasedOnTheme()}/>
        </svg> */}
        <DotsThreeOutline size={32} weight="fill" color={getColorBasedOnTheme()} />
      </button>
      { openSettingsModal && (
        <SettingsModal
          openSettingsModal={openSettingsModal}
          setOpenSettingsModal={setOpenSettingsModal}
        />
      )}
      {/* Play and Pause */}
      { ticking
        ? (
          <button
            onClick={startTimer}
            className={`flex px-12 py-8 items-center gap-4 rounded-[32px]
              ${theme === 'light' && 'bg-red-100'}
              ${theme === 'lightshortbreak' && 'bg-green-100'}
              ${theme === 'lightlongbreak' && 'bg-blue-100'}
              ${theme === 'dark' && 'bg-red-700'}
              ${theme === 'darkshortbreak' && 'bg-green-700'}
              ${theme === 'darklongbreak' && 'bg-blue-700'}
            `}
            aria-label="Button to Pause the actual timer"
          >
            <Pause size={34} weight="fill" color={getColorBasedOnTheme()} />
          </button>
        ) 
        : (
          <button
            className={`flex px-12 py-8 items-center gap-4 rounded-[32px]
              ${theme === 'light' && 'bg-red-100'}
              ${theme === 'lightshortbreak' && 'bg-green-100'}
              ${theme === 'lightlongbreak' && 'bg-blue-100'}
              ${theme === 'dark' && 'bg-red-700'}
              ${theme === 'darkshortbreak' && 'bg-green-700'}
              ${theme === 'darklongbreak' && 'bg-blue-700'}
            `}
            onClick={startTimer}
            aria-label="Button to Start the actual timer"
          >
            <Play size={34} weight="fill" color={getColorBasedOnTheme()} />
          </button>
        )
      }
      {/* Skip */}
      { ticking ? (
        <button
        className={`flex p-6 content-center items-center gap-4 rounded-3xl
          ${theme === 'light' && 'bg-red-100'}
          ${theme === 'lightshortbreak' && 'bg-green-100'}
          ${theme === 'lightlongbreak' && 'bg-blue-100'}
          ${theme === 'dark' && 'bg-red-500 bg-opacity-20'}
          ${theme === 'darkshortbreak' && 'bg-green-100 bg-opacity-10'}
          ${theme === 'darklongbreak' && 'bg-blue-100 bg-opacity-10'}
        `}
        onClick={() => resetActualTimer()}
        aria-label="Button that reset the actual timer"
      >
        <ArrowCounterClockwise size={32} weight="bold" color={getColorBasedOnTheme()} />
      </button>
      ) : (
        <button
          className={`flex p-6 content-center items-center gap-4 rounded-3xl
            ${theme === 'light' && 'bg-red-100'}
            ${theme === 'lightshortbreak' && 'bg-green-100'}
            ${theme === 'lightlongbreak' && 'bg-blue-100'}
            ${theme === 'dark' && 'bg-red-500 bg-opacity-20'}
            ${theme === 'darkshortbreak' && 'bg-green-100 bg-opacity-10'}
            ${theme === 'darklongbreak' && 'bg-blue-100 bg-opacity-10'}
          `}
          onClick={() => switchStage(stage <= 1 ? stage+1 : 0)}
          aria-label="Button that go to next timer"
        >
          <CaretDoubleRight size={32} weight="fill" color={getColorBasedOnTheme()} />
        </button>
      )}
    </div>
  );
}
