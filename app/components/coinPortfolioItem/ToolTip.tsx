import React from "react";
import { EditInfoSVG, EditMobileInfoSVG } from "./CoinCardSVG";
import useWindowWidth from "../hooks/hooks";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const ToolTipMui = ({text, eventHandler, marginBottom}:{text: string, eventHandler:any, marginBottom:string}) => {
  const isMobile = useWindowWidth() < 481;
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
                marginBottom: {marginBottom},
                fontSize: "16px",
              },
          },
        },
      }}>
      <div>
        <button  onClick={eventHandler} className="-mt-.5">
          {isMobile ? <EditMobileInfoSVG /> : <EditInfoSVG />}
        </button>
      </div>
    </Tooltip>
  );
};