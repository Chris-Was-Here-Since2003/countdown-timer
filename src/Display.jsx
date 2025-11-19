function TimerDisplay({ time }) {
  const format = (num) => String(num).padStart(2, "0");

  return (
    <h1 className="timer-output">
      {format(time.hours)}:{format(time.minutes)}:{format(time.seconds)}
    </h1>
  );
}

export default TimerDisplay;
