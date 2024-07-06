import React, { useState, useEffect } from "react";
import { calculateHoursLeft } from "./utils";

const NextUpdate = () => {
  const [time, setTime] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const hours = new Date().getHours();
  const adjustHours = calculateHoursLeft(hours);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="mt-auto mb-1 text-base font-bold">The next update will happen in:</p>
      <p className="mb-auto mt-1  tabular-nums font-extralight">{adjustHours} hours, {59 - minutes < 10 ? "0" + (59 - minutes) : 59 - minutes} minutes, {59 - time < 10 ? "0" + (59 - time) : 59 - time} seconds</p>
    </div>
  );
};
export default NextUpdate;