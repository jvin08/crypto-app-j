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
    disabled: boolean,
}
const CustomButton = ({name, handleClick, active, width, padding, disabled}: Props) => {
  const darkmode = useSelector(selectDarkmode);
  const bgColor = active ? "bg-cryptoblue-600 text-cryptoblue-100" : "bg-cryptoblue-100";
  return (
    <div className={clsx(`${width} rounded-md p-[1px] h-[45px] sm:h-[43px]`, {
      "bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800": active && !darkmode,
      "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800": active && darkmode,
    })}>
      <button onClick={handleClick} disabled={disabled} className={clsx(`${bgColor} text-sm w-full h-full rounded-[5px] ${padding}`,{
        "bg-cryptoblue-600 text-cryptoblue-100": active && !darkmode,
        "bg-cryptoblue-100": !active && !darkmode,
        "bg-cryptodark-750": active && darkmode,
        "bg-cryptodark-150 text-cryptoblue-100": !active && darkmode,
      })}>{name}</button>
    </div>
  );
};
type MobileProps = {
  name: String,
  handleClick: MouseEventHandler,
  active: boolean,
  width: string,
  padding: string,
  disabled: boolean,
  children?: React.ReactNode,
}
export const MobileCustomButton = ({handleClick, active, width, padding, disabled, children}: MobileProps) => {
  const darkmode = useSelector(selectDarkmode);
  const bgColor = active ? "bg-cryptoblue-600 text-cryptoblue-100" : "bg-cryptoblue-100";
  return (
    <div className={clsx(`${width} rounded-full p-[1px] h-14 ml-3`, {
      "bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800": active && !darkmode,
      "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800": active && darkmode,
    })}>
      <button onClick={handleClick} disabled={disabled} className={clsx(`${bgColor} flex items-center justify-center text-xl w-full h-full rounded-full ${padding}`,{
        "bg-cryptoblue-600 text-cryptoblue-100": active && !darkmode,
        "bg-cryptoblue-100": !active && !darkmode,
        "bg-cryptodark-750": active && darkmode,
        "bg-cryptodark-150 text-cryptoblue-100": !active && darkmode,
      })}>
        {children}
      </button>
    </div>
  );
};

export default CustomButton;        