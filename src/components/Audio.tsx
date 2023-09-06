import React from "react";

export const Audio = React.forwardRef(function RunAudio(_, ref: any) {
  return (
    <audio ref={ref}>
      <source src="/assets/audios/alarm.mp3" type="audio/mp3" />
      Your browser does not support audio.
    </audio>
  );
})