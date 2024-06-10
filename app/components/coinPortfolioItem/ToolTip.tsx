import React from "react";
import { EditInfoSVG, EditMobileInfoSVG } from "./CoinCardSVG";
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
import useWindowWidth from "../hooks/hooks";

export const ToolTipCoinCard = ({name, eventHandler}:{name: string, eventHandler: any}) => {
  const darkmode = useSelector(selectDarkmode);
  const width = useWindowWidth();
  const isMobile = width < 481;
  const textColor = darkmode ? "white" : "black";
  const bgColor = darkmode ? "black" : "white";
  const borderColor = "#7776F8";
  const tolltipMarginBottom = isMobile ? "-24px" : "0px";
  return (
    <TooltipProvider delayDuration={100} >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button  onClick={eventHandler} variant={null} className="-ml-4 -mt-2.5">
            {isMobile ? <EditMobileInfoSVG /> : <EditInfoSVG />}
          </Button>
        </TooltipTrigger>
        <TooltipContent style={{backgroundColor: bgColor, color: textColor, borderColor: borderColor}}>
          <TooltipArrow style={{fill: borderColor, width:"10px", height: "8px", marginBottom: tolltipMarginBottom}} />
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
