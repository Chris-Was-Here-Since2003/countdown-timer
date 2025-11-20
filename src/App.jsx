import { useState, useEffect } from "react";
import TimeInput from "./Input.jsx";
import TimerDisplay from "./Display.jsx";
import StartButton from "./Start.jsx";
import alarm from "./assets/alarm.mp3"

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const audio = new Audio(alarm);

  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer = null;

    if (isRunning && !isPaused && totalTime > 0) {
      timer = setInterval(() => {
        setTotalTime((prev) => prev - 1);
      }, 1000);
    }else if(isRunning && totalTime==0){
      audio.play();
      audio.loop = true;

    }

    return () => clearInterval(timer);
  }, [isRunning, isPaused, totalTime]);

  const handleStart = () => {
    const initial = hours * 3600 + minutes * 60 + seconds;

    if (initial > 0) {
      setTotalTime(initial);
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    
    setIsPaused(false);
  };

  const handleReset = () => {
    audio.pause();
    audio.loop = false;
    audio.currentTime = 0;
    setIsRunning(false);
    setIsPaused(false);
    setTotalTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const timeObj = {
    hours: Math.floor(totalTime / 3600),
    minutes: Math.floor((totalTime % 3600) / 60),
    seconds: totalTime % 60,
  };

  return (
    <div className="container">
      <h2>⏳ React Countdown Timer ⏳</h2>

      <div className="inputs">
        <TimeInput label="Hours" value={hours} onChange={setHours} />
        <TimeInput label="Minutes" value={minutes} onChange={setMinutes} />
        <TimeInput label="Seconds" value={seconds} onChange={setSeconds} />
      </div>

      {!isRunning && (
        <button onClick={handleStart}>Start Timer</button>
      )}

      {isRunning && !isPaused && totalTime!= 0 &&(
        <button onClick={handlePause}>Pause</button>
      )}

      {isRunning && isPaused &&(
        <button onClick={handleResume}>Resume</button>
      )}

      {isRunning && totalTime!= 0 &&(
        <button onClick={handleReset}>Reset</button>
      )}

      {isRunning && totalTime == 0 && !isPaused && (
        <button onClick={handleReset}>Stop Alarm</button>
        )
      }

      <TimerDisplay time={timeObj} />
      {isRunning && totalTime == 0 && !isPaused && (
        <h3 className="alarm-text">⏰ Time's up! ⏰</h3>
      )}
    </div>
  );
}

export default App;
