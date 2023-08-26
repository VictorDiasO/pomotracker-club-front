import { useState } from "react";
import { useTheme } from "next-themes";
import { ArrowCounterClockwise, CaretDoubleRight, DotsThreeOutline, Pause, Play } from "@phosphor-icons/react";
import { useTimerContext } from "@/contexts";
import { dynamicButtonColors, dynamicIconColors } from "@/helpers";
import { SettingsModal } from "./SettingsModal";

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

  return (
    <div className="flex items-center gap-4">
      <button
        className={`flex p-6 content-center items-center gap-4 rounded-3xl 
          ${dynamicButtonColors.secondaryDynamicButtonColors(theme)}
        `}
        onClick={() => setOpenSettingsModal(!openSettingsModal)}
        aria-label="Button to open settings modal"
      >
        <DotsThreeOutline size={32} weight="fill" color={dynamicIconColors.getColorBasedOnTheme(theme)} />
      </button>
      { openSettingsModal && (
        <SettingsModal
          openSettingsModal={openSettingsModal}
          setOpenSettingsModal={setOpenSettingsModal}
        />
      )}
      { ticking
        ? (
          <button
            onClick={startTimer}
            className={`flex px-12 py-8 items-center gap-4 rounded-[32px]
              ${dynamicButtonColors.primaryDynamicButtonColors(theme)}
            `}
            aria-label="Button to Pause the actual timer"
          >
            <Pause size={32} weight="fill" color={dynamicIconColors.getColorBasedOnTheme(theme)} />
          </button>
        ) 
        : (
          <button
            className={`flex px-12 py-8 items-center gap-4 rounded-[32px]
              ${dynamicButtonColors.primaryDynamicButtonColors(theme)}
            `}
            onClick={startTimer}
            aria-label="Button to Start the actual timer"
          >
            <Play size={32} weight="fill" color={dynamicIconColors.getColorBasedOnTheme(theme)} />
          </button>
        )
      }
      { ticking ? (
        <button
        className={`flex p-6 content-center items-center gap-4 rounded-3xl
          ${dynamicButtonColors.secondaryDynamicButtonColors(theme)}
        `}
        onClick={() => resetActualTimer()}
        aria-label="Button that reset the actual timer"
      >
        <ArrowCounterClockwise size={32} weight="bold" color={dynamicIconColors.getColorBasedOnTheme(theme)} />
      </button>
      ) : (
        <button
          className={`flex p-6 content-center items-center gap-4 rounded-3xl
            ${dynamicButtonColors.secondaryDynamicButtonColors(theme)}
          `}
          onClick={() => switchStage(stage <= 1 ? stage+1 : 0)}
          aria-label="Button that go to next timer"
        >
          <CaretDoubleRight size={32} weight="fill" color={dynamicIconColors.getColorBasedOnTheme(theme)} />
        </button>
      )}
    </div>
  );
}
