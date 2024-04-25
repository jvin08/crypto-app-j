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
  const active = pathname === "/" ? true : false;
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("mt-32 p-1 rounded-md flex w-[506px] h-[53px]", {
      "bg-cryptoblue-100": !darkmode,
      "bg-cryptodark-200": darkmode,
    })}>
      <Link href="/">
        <CustomButton name="Coins" handleClick={()=>handleNotification("Coins on")} active={active} width="w-[244px]" padding="py-[1px]"/>
      </Link>
      <Link href="/converter">
        <CustomButton name="Converter" handleClick={()=>handleNotification("Converter on")} active={!active} width="w-[244px]" padding="py-[1px]" />
      </Link>
    </div>
  );
};
export default ButtonsBox;