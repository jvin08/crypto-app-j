import React, { useState, useEffect } from "react";
import clsx from "clsx";
const Time = ({darkmode}: {darkmode: boolean}) => {
  const formattedDateTime = (time: Date) => time.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",  
    hour12: false // Use 24-hour format
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const updateTime = () => {
    setCurrentTime(new Date());
  };
  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  },[]);
  return (
    <div className={clsx("text-xs",{
      "text-cryptoblue-810 opacity-[.8]": !darkmode,
      "text-cryptodark-510": darkmode,
    })}>
      {formattedDateTime(currentTime)}
    </div>
  );
};
export default Time;