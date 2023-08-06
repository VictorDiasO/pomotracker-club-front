interface ITimer {
  seconds: number;
  getTickingTime: () => any;
}

export const Timer = ({ seconds, getTickingTime }: ITimer) => {
  const minutes = getTickingTime();
  return (
    <h1
      className="font-roboto font-thin text-[256px] text-center leading-[85%] text-red-900"
    >
      {minutes.toString().padStart(2, '0')}<br />
      {seconds.toString().padStart(2, '0')}
    </h1>
  );
}