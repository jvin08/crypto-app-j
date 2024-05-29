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
    <div className={clsx("mt-32 sm:mt-[76px] sm:mx-auto p-1 rounded-md flex w-[506px] sm:w-[343px] h-[53px] sm:h-10", {
      "bg-cryptoblue-100": !darkmode,
      "bg-cryptodark-200": darkmode,
    })}>
      <Link href="/">
        <CustomButton name="Coins" handleClick={()=>handleNotification("Coins on")} active={active} width="w-[244px] sm:w-[167px]" padding="py-[1px]"/>
      </Link>
      <Link href="/converter">
        <CustomButton name="Converter" handleClick={()=>handleNotification("Converter on")} active={!active} width="w-[244px] sm:w-[167px]" padding="py-[1px]" />
      </Link>
    </div>
  );
};
export default ButtonsBox;