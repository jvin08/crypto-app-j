import React from "react";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ButtonsBox = () => {
  const pathname = usePathname();
  const active = pathname === "/" ? false : true;
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("p-1 rounded-md flex w-fit", {
      "bg-cryptoblue-100": !darkmode,
      "bg-cryptodark-150": darkmode,
    })}>
      <Link href="/"><CustomButton name="Coins"  handleClick={()=>{}} active={active} width="w-64" padding="py-2"/></Link>
      <Link href="/convertor"><CustomButton name="Convertor" handleClick={()=>{}} active={!active} width="w-64" padding="py-2" /></Link>
    </div>
  );
};
export default ButtonsBox;
