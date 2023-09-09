import React from "react";

export const TimeToFocusAudio = React.forwardRef(function RunAudio(_, ref: any) {
  return (
    <audio ref={ref}>
      <source src="/assets/audios/focus-2.wav" type="audio/wav" />
      Your browser does not support audio.
    </audio>
  );
})

export const TimeToABreakAudio = React.forwardRef(function RunAudio(_, ref: any) {
  return (
    <audio ref={ref}>
      <source src="/assets/audios/focus-1.wav" type="audio/wav" />
      Your browser does not support audio.
    </audio>
  );
})