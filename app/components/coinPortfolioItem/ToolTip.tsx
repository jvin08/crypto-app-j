import React from "react";
import { SellCoinsSVG, EditInfoSVG } from "./CoinCardSVG";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
export const ToolTipCoinCard = ({name, eventHandler}:{name: string, eventHandler: any}) => {
  const darkmode = useSelector(selectDarkmode);
  const textColor = darkmode ? "white" : "black";
  const bgColor = darkmode ? "black" : "white";
  const borderColor = "#7776F8";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button  onClick={eventHandler} variant={null} className="-ml-4 -mt-2.5">
            {name==="Edit coin data" ? <EditInfoSVG /> : <SellCoinsSVG />}
          </Button>
        </TooltipTrigger>
        <TooltipContent style={{backgroundColor: bgColor, color: textColor, borderColor: borderColor}}>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
