import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const ToolTip = ({text, children}:{text: string, children: React.ReactElement}) => {
  return (
    <Tooltip 
      title={text} 
      arrow 
      placement="top" 
      enterTouchDelay={100}
      leaveDelay={0}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: "6px",
                fontSize: "1rem",
              },
          },
        },
      }}>
      {children}
    </Tooltip>
  );
};