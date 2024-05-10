import React from "react";

interface ArrowDownProps {
  eventHandler: () => void;
}
export const ArrowDown = ({eventHandler}:ArrowDownProps) => {
  return (
    <button className="opacity-0 hover:opacity-100" onClick={eventHandler}>
      <span className="text-[8px] mr-1">&#9660;</span>
    </button>
  );
};