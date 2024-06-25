import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const ToolTip = ({text}:{text: string}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <span className="tooltip-info sm:tooltip-left tooltip-right tooltip ml-4 text-base text-cryptodark-400" data-tip={text}>
      <button className={clsx("px-[3px] h-5 w-5 text-base leading-3 rounded-full",{
        "bg-cryptoblue-100": darkmode,
        "bg-cryptoblue-250 text-cryptoblue-100": !darkmode
      })}>?</button>
    </span>
  );
};
export const DateToolTip = ({text}:{text: string}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("absolute -top-3 left-2 tooltip-info h-5 sm:tooltip-left tooltip-right tooltip ml-auto text-base",{
      "text-cryptodark-400": darkmode,
      "text-cryptoblue-100": !darkmode
    })} data-tip={text}>
      <button className={clsx("px-[3px] h-5 w-5 text-base leading-3 rounded-full",{
        "bg-cryptoblue-100": darkmode,
        "bg-cryptoblue-250 text-cryptoblue-100": !darkmode
      })}>?</button>
    </div>
  );
};
export const ToolTipMui = ({text}:{text: string}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <Tooltip 
      title={text} 
      arrow 
      placement="top" 
      enterTouchDelay={0}
      leaveDelay={700}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: "5px",
              },
          },
        },
      }}>
      <div>
        <button  className={clsx("px-[3px] h-5 w-5 text-base leading-3 rounded-full",{
          "bg-cryptoblue-100 text-cryptoblue-460": darkmode,
          "bg-cryptoblue-250 text-cryptoblue-100": !darkmode
        })}>?</button>
      </div>
    </Tooltip>
  );
};