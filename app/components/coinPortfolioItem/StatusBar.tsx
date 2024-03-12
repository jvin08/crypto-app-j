import React from "react";
const StatusBar = ({name, width}:{name: string, width: string}) => {
  const statusWidth = Number(width) * 100 < 10 ? "0.5rem" : width + "%";
  return (
    <div className="w-1/4">
      <p className="text-[11px] mb-1 text-center">{name}</p>
      <div className="flex items-center px-auto">
        <p className="text-xs text-cryptoblue-100 ml-6 mr-2">{Number(width) * 100}%</p>
        <div className="relative">
          <div className="absolute top-0 left-0 w-[4rem] h-1.5 z-50 rounded-sm px-px bg-cryptoblue-650 opacity-40"></div>
          <div className="absolut top-0 left-0 h-1.5 rounded-l-sm z-50 px-px bg-cryptoblue-200" style={{width: statusWidth}}></div>
        </div>
      </div>
    </div>
  );
};
export default StatusBar;
