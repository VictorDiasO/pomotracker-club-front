"use client";
import React, { useEffect, useState } from "react";
import './pomodoro.css';

import { Timer } from "@/components/Timer";
import { initialLongBreak, initialPomodoro, initialShortBreak } from "@/constants/timers";
import { TimerController } from "@/components/TimerController";
import { useTimerContext } from "@/contexts";
import { DynamicChip } from "@/components/Chips/DynamicChip";

function Home() {
  const {
    pomodoro,
    shortBreak,
    longBreak,
  } = useTimerContext();

  const [ mounted, setMounted ] = useState<boolean>();

  useEffect(() => {
    window.onbeforeunload = () => {
      return pomodoro !== initialPomodoro
        || shortBreak !== initialShortBreak
        || longBreak !== initialLongBreak ? 'Show warning' : null;
    };
    setMounted(true);
  }, [pomodoro, shortBreak, longBreak]);

  if (!mounted) return null;

  return (
    <main>
      <div className="flex content-center items-center w-full h-full">
        <div className="flex flex-col flex-1 py-12 md:p-12 lg:p-12 content-center items-center gap-8 self-stretch">
          <DynamicChip />
          <Timer />
          <TimerController />
        </div>
      </div>
    </main>
  );
}

export default React.memo(Home);