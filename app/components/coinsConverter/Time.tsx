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
  const [isClient, setIsClient] = useState(false);
  const updateTime = () => {
    setCurrentTime(new Date());
  };
  useEffect(() => {
    setIsClient(true);
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  },[]);
  if (!isClient) {
    return <p className="loader time text-xs"></p>;
  }
  return (
    <p className={clsx("text-xs",{
      "text-cryptoblue-810 opacity-[.8]": !darkmode,
      "text-cryptodark-510": darkmode,
    })}>
      {formattedDateTime(currentTime)}
    </p>
  );
};
export default Time;