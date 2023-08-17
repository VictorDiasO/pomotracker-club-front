import { useTheme } from "next-themes";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";

interface ITimerController {
  ticking: boolean;
  startTimer: () => void;
  stage: number;
  switchStage: (index: number) => void;
  pomodoro: number;
  setPomodoro: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerController = ({
  ticking,
  startTimer,
  stage,
  switchStage,
  pomodoro,
  setPomodoro,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak
}: ITimerController) => {
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
        `}
        onClick={() => setOpenSettingsModal(!openSettingsModal)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M19.5 16C19.5 16.6922 19.2947 17.3689 18.9101 17.9445C18.5256 18.5201 17.9789 18.9687 17.3394 19.2336C16.6999 19.4985 15.9961 19.5678 15.3172 19.4327C14.6383 19.2977 14.0146 18.9644 13.5251 18.4749C13.0356 17.9854 12.7023 17.3617 12.5673 16.6828C12.4322 16.0039 12.5015 15.3001 12.7664 14.6606C13.0313 14.0211 13.4799 13.4744 14.0555 13.0899C14.6311 12.7053 15.3078 12.5 16 12.5C16.9272 12.5033 17.8156 12.8731 18.4712 13.5288C19.1269 14.1844 19.4967 15.0728 19.5 16ZM6 12.5C5.30777 12.5 4.63108 12.7053 4.0555 13.0899C3.47993 13.4744 3.03133 14.0211 2.76642 14.6606C2.50151 15.3001 2.4322 16.0039 2.56725 16.6828C2.7023 17.3617 3.03564 17.9854 3.52513 18.4749C4.01461 18.9644 4.63825 19.2977 5.31718 19.4327C5.99612 19.5678 6.69985 19.4985 7.33939 19.2336C7.97893 18.9687 8.52556 18.5201 8.91014 17.9445C9.29473 17.3689 9.5 16.6922 9.5 16C9.49671 15.0728 9.1269 14.1844 8.47123 13.5288C7.81557 12.8731 6.92724 12.5033 6 12.5ZM26 12.5C25.3078 12.5 24.6311 12.7053 24.0555 13.0899C23.4799 13.4744 23.0313 14.0211 22.7664 14.6606C22.5015 15.3001 22.4322 16.0039 22.5673 16.6828C22.7023 17.3617 23.0356 17.9854 23.5251 18.4749C24.0146 18.9644 24.6383 19.2977 25.3172 19.4327C25.9961 19.5678 26.6999 19.4985 27.3394 19.2336C27.9789 18.9687 28.5256 18.5201 28.9101 17.9445C29.2947 17.3689 29.5 16.6922 29.5 16C29.4967 15.0728 29.1269 14.1844 28.4712 13.5288C27.8156 12.8731 26.9272 12.5033 26 12.5Z" fill={getColorBasedOnTheme()}/>
        </svg>
      </button>
      { openSettingsModal && (
        <SettingsModal
          openSettingsModal={openSettingsModal}
          setOpenSettingsModal={setOpenSettingsModal}
          pomodoro={pomodoro}
          setPomodoro={setPomodoro}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
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
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M27 6V26C27 26.5304 26.7893 27.0391 26.4142 27.4142C26.0391 27.7893 25.5304 28 25 28H20.5C19.9696 28 19.4609 27.7893 19.0858 27.4142C18.7107 27.0391 18.5 26.5304 18.5 26V6C18.5 5.46957 18.7107 4.96086 19.0858 4.58579C19.4609 4.21071 19.9696 4 20.5 4H25C25.5304 4 26.0391 4.21071 26.4142 4.58579C26.7893 4.96086 27 5.46957 27 6ZM11.5 4H7C6.46957 4 5.96086 4.21071 5.58579 4.58579C5.21071 4.96086 5 5.46957 5 6V26C5 26.5304 5.21071 27.0391 5.58579 27.4142C5.96086 27.7893 6.46957 28 7 28H11.5C12.0304 28 12.5391 27.7893 12.9142 27.4142C13.2893 27.0391 13.5 26.5304 13.5 26V6C13.5 5.46957 13.2893 4.96086 12.9142 4.58579C12.5391 4.21071 12.0304 4 11.5 4Z" fill={getColorBasedOnTheme()}/>
            </svg>
          </button>
        ) 
        : (
          <button
            className={`flex px-12 py-8 items-center gap-4 rounded-[32px]
              ${theme === 'light' && 'bg-red-100'}
              ${theme === 'lightshortbreak' && 'bg-green-100'}
              ${theme === 'lightlongbreak' && 'bg-blue-100'}
            `}
            onClick={startTimer}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M30 16C29.9992 16.3439 29.9104 16.6818 29.7419 16.9816C29.5734 17.2814 29.3309 17.533 29.0375 17.7125L11.0375 28.7C10.7377 28.89 10.3914 28.9939 10.0365 29.0006C9.68159 29.0072 9.33169 28.9162 9.02499 28.7375C8.71376 28.5667 8.4543 28.3152 8.27392 28.0095C8.09355 27.7037 7.99892 27.355 7.99999 27V4.99996C7.99892 4.64496 8.09355 4.29623 8.27392 3.99047C8.4543 3.68471 8.71376 3.43322 9.02499 3.26246C9.33169 3.08376 9.68159 2.99275 10.0365 2.99936C10.3914 3.00597 10.7377 3.10996 11.0375 3.29996L29.0375 14.2875C29.3309 14.4669 29.5734 14.7185 29.7419 15.0183C29.9104 15.3181 29.9992 15.6561 30 16Z" fill={getColorBasedOnTheme()} />
            </svg>
          </button>
        )
      }
      {/* Skip */}
      <button
        className={`flex p-6 content-center items-center gap-4 rounded-3xl
          ${theme === 'light' && 'bg-red-100'}
          ${theme === 'lightshortbreak' && 'bg-green-100'}
          ${theme === 'lightlongbreak' && 'bg-blue-100'}
        `}
        onClick={() => switchStage(stage <= 1 ? stage+1 : 0)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M31.65 16.0001C31.6515 16.3353 31.5687 16.6656 31.4093 16.9604C31.2498 17.2553 31.0188 17.5054 30.7375 17.6876L19.5875 24.8501C19.2849 25.0462 18.935 25.1568 18.5747 25.1703C18.2144 25.1837 17.8571 25.0995 17.5408 24.9266C17.2244 24.7537 16.9607 24.4985 16.7774 24.188C16.5942 23.8774 16.4984 23.5232 16.5 23.1626V17.8376L5.58749 24.8501C5.28491 25.0462 4.93496 25.1568 4.57467 25.1703C4.21438 25.1837 3.85714 25.0995 3.54077 24.9266C3.2244 24.7537 2.96065 24.4985 2.77744 24.188C2.59423 23.8774 2.49836 23.5232 2.49999 23.1626V8.83763C2.49836 8.47709 2.59423 8.12282 2.77744 7.8123C2.96065 7.50177 3.2244 7.24655 3.54077 7.07364C3.85714 6.90072 4.21438 6.81654 4.57467 6.83001C4.93496 6.84347 5.28491 6.95408 5.58749 7.15013L16.5 14.1626V8.83763C16.4984 8.47709 16.5942 8.12282 16.7774 7.8123C16.9607 7.50177 17.2244 7.24655 17.5408 7.07364C17.8571 6.90072 18.2144 6.81654 18.5747 6.83001C18.935 6.84347 19.2849 6.95408 19.5875 7.15013L30.7375 14.3126C31.0188 14.4949 31.2498 14.745 31.4093 15.0398C31.5687 15.3347 31.6515 15.6649 31.65 16.0001Z" fill={getColorBasedOnTheme()} />
        </svg>
      </button>
    </div>
  );
}
