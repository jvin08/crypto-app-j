import React from "react";
import { EditInfoSVG } from "./CoinCardSVG";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { TooltipArrow } from "@radix-ui/react-tooltip";
export const ToolTipCoinCard = ({name, eventHandler}:{name: string, eventHandler: any}) => {
  const darkmode = useSelector(selectDarkmode);
  const textColor = darkmode ? "white" : "black";
  const bgColor = darkmode ? "black" : "white";
  const borderColor = "#7776F8";
  return (
    <TooltipProvider delayDuration={100} >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button  onClick={eventHandler} variant={null} className="-ml-4 -mt-2.5">
            <EditInfoSVG />
          </Button>
        </TooltipTrigger>
        <TooltipContent style={{backgroundColor: bgColor, color: textColor, borderColor: borderColor}}>
          <TooltipArrow style={{fill: borderColor, width:"10px", height: "8px"}} />
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
