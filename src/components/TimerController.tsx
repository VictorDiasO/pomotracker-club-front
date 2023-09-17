"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowCounterClockwise, CaretDoubleRight, ChartBar, CheckFat, DotsThreeOutline, GearSix, Icon, Pause, Play } from "@phosphor-icons/react";
import { useTimerContext } from "@/contexts";
import { dynamicButtonColors, dynamicIconColors } from "@/helpers";
import { SettingsModal } from "./SettingsModal";
import { Popover } from "antd";
import { TasksModal } from "./TasksModal";

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

  const [ showMenuPopover, setShowMenuPopover ] = useState(false);
  const [ openSettingsModal, setOpenSettingsModal ] = useState(false);
  const [ openTasksModal, setOpenTasksModal ] = useState(false);

  const contentItem = (title: string, key: string, Icon: Icon, modalToOpen: boolean, setModalToOpen: (value: SetStateAction<boolean>) => void) => (
    <button
      className="flex flex-row gap-2 justify-between text-center items-center py-3"
      onClick={() => {
        setShowMenuPopover(false);
        setModalToOpen(!modalToOpen);
      }}
    >
      <Icon size={24} weight="fill" />
      <p className="text-base font-medium">{title}</p>
      <p className="ml-6 py-0 px-2 items-center border-2 rounded-[4px] text-xs">
        Ctrl
      </p>
      +
      <p className="py-0 px-2 items-center border-2 rounded-[4px] text-xs">
        {key}
      </p>
    </button>
  )

  const content = (
    <div className="flex flex-col p-1">
      {contentItem('Statistics', 'S', ChartBar, false, () => {})}
      {contentItem('Preferences', 'P', GearSix, openSettingsModal, setOpenSettingsModal)}
      {contentItem('Manage Tasks', 'M', CheckFat, openTasksModal, setOpenTasksModal)}
    </div>
  );

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault()
        setShowMenuPopover(false)
        setOpenSettingsModal(!openSettingsModal)
      }
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault()
        setShowMenuPopover(false)
        setOpenTasksModal(!openTasksModal)
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  })

  return (
    <div className="flex items-center gap-4">
      <Popover content={content} trigger="click" onOpenChange={(isVisible) => setShowMenuPopover(isVisible)} open={showMenuPopover}>
       <button
          className={`
            flex p-6 content-center items-center gap-4 rounded-3xl
            ${dynamicButtonColors.secondaryDynamicButtonColors(theme)}
          `}
          aria-label="Button to open settings modal"
        >
          <DotsThreeOutline size={32} weight="fill" color={dynamicIconColors.getColorBasedOnTheme(theme)} />
        </button>
      </Popover>
      { openSettingsModal && (
        <SettingsModal
          openSettingsModal={openSettingsModal}
          setOpenSettingsModal={setOpenSettingsModal}
        />
      )}
      { openTasksModal && (
        <TasksModal
          openSettingsModal={openTasksModal}
          setOpenSettingsModal={setOpenTasksModal}
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
