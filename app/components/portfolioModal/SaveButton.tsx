import React, { MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";

type Props = {
    name: String,
    handleClick: MouseEventHandler,
    active: boolean,
    width: string,
    padding: string,
}
const SaveButton = ({name, handleClick, active, width, padding}: Props) => {
  const darkmode = useSelector(selectDarkmode);
  const bgColor = active ? "bg-cryptoblue-600 text-cryptoblue-100" : "bg-cryptoblue-100";
  return (
    <div className={clsx(`${width} rounded-md p-px sm:mt-2`, {
      "bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800": active && !darkmode,
      "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800": active && darkmode,
      "bg-cryptodark-150": !active && darkmode,
    })}>
      <button onClick={handleClick} disabled={!active} className={clsx(`h-11 ${bgColor} text-base w-full rounded-[5px] ${padding}`,{
        "bg-cryptoblue-600 text-cryptoblue-100": active && !darkmode,
        "bg-cryptoblue-200 text-cryptoblue-100": !active && !darkmode,
        "bg-cryptodark-750": active && darkmode,
        "bg-cryptodark-150 text-cryptoblue-500": !active && darkmode,
      })}>{name}</button>
    </div>
  );
};
export default SaveButton;
