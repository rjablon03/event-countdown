import { useEffect, useState } from "react";

type EventContainerProps = {
  title: string;
  targetDate: string; // Example: "2025-12-31T23:59:59"
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// ✅ Explicitly parse targetDate as local time
function calculateCountdownLocal(targetDate: string): Countdown {
  const [year, month, day, hour, minute, second] = targetDate
    .split(/[-T:]/)
    .map(Number);
  // new Date(year, monthIndex, ...) always uses local time
  const target = new Date(year, month - 1, day, hour, minute, second);
  const now = new Date();

  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function EventContainer(props: EventContainerProps) {
  const [countdown, setCountdown] = useState<Countdown>(
    calculateCountdownLocal(props.targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdownLocal(props.targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [props.targetDate]);

  return (
    <div className="event-container bg-emerald-400 p-3 md:p-5 lg:p-7 rounded-2xl my-5 w-[70%]">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl">
        {props.title}
      </h1>
      <p className="text-lg md:text-2xl lg:text-4xl">
        {countdown.days} Day{countdown.days !== 1 ? "s" : ""},{" "}
        {countdown.hours} Hour{countdown.hours !== 1 ? "s" : ""},{" "}
        {countdown.minutes} Minute{countdown.minutes !== 1 ? "s" : ""}, and{" "}
        {countdown.seconds} Second{countdown.seconds !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
