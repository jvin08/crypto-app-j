import React from "react";
const DataElement = ({name, value, width}:{name: string, value: string, width: string}) => {
  return (
    <div className={`flex flex-col items-center ${width}`}>
      <p className="text-[11px]">{name}</p>
      <p className="text-xs text-cryptoblue-650">{value}</p>
    </div>
  );
};
export default DataElement;
