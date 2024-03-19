import React from "react";
import CustomButton from "./CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkmode, setShowNotification, setNotification } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ButtonsBox = () => {
  const dispatch = useDispatch();
  const handleNotification = (message: string) => {
    dispatch(setNotification(message));
    dispatch(setShowNotification(""));
  };
  const pathname = usePathname();
  const active = pathname === "/" ? false : true;
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("mt-24 p-1 rounded-md flex w-fit", {
      "bg-cryptoblue-100": !darkmode,
      "bg-cryptodark-150": darkmode,
    })}>
      <Link href="/"><CustomButton name="Coins" handleClick={()=>handleNotification("Coins on")} active={active} width="w-64" padding="py-2"/></Link>
      <Link href="/converter"><CustomButton name="Converter" handleClick={()=>handleNotification("Converter on")} active={!active} width="w-64" padding="py-2" /></Link>
    </div>
  );
};
export default ButtonsBox;