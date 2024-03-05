import React from "react";
import clsx from "clsx";
const Time = ({darkmode}: {darkmode: boolean}) => {
  const dateTime = new Date();
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",  
    hour12: false // Use 24-hour format
  });
  return (
    <div className={clsx("text-xs",{
      "text-cryptoblue-810 opacity-[.8]": !darkmode,
      "text-cryptodark-510": darkmode,
    })}>
      {formattedDateTime}
    </div>
  );
};
export default Time;