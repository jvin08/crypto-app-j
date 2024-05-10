import { ColumnNameProps } from "@/app/types/types";
import React from "react";

const ColumnName = ({props, sort, order, visible, opacity}:ColumnNameProps) => {
  return (
    <p className={props.style}>
      {sort===props.name && order==="_desc" 
        ? <span className={sort===props.name ? visible : opacity} data-name={props.name}>&#9650;</span>
        : <span className={sort===props.name ? visible : opacity} data-name={props.name}>&#9660;</span>}
      {" " + props.text}
    </p>
  );
};
export default ColumnName;