import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const Date = ({inputHandler}:{inputHandler: any}) => {
  const [visible, setVisible] = useState(false);
  const darkmode = useSelector(selectDarkmode);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputHandler(e);
  };
  return (
    <div className="text-base">
      {!visible ? <div className={clsx("w-full flex justify-between h-11 px-4 items-center rounded",{
        "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-200 text-cryptodark-510": darkmode,
      })}
      >
        <p>Purchased Date</p>
        <svg 
          className="cursor-pointer" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleVisible}
        >
          <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
            fill={clsx("",{
              "white": darkmode,
              "#3D3D7E": !darkmode,
            })}
          />
        </svg>
      </div> :
        <div  className={clsx("w-full flex justify-between h-11 px-4 rounded",{
          "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
          "bg-cryptodark-200 text-cryptodark-510": darkmode,
        })}> 
          <input type="date" name="date" onChange={handleEvent} required className={clsx("cursor-pointer",{
            "bg-cryptodark-200": darkmode,
            "bg-cryptoblue-200": !darkmode,
          })}/>
          <input type="time" name="time" onChange={handleEvent} required className={clsx("cursor-pointer",{
            "bg-cryptodark-200": darkmode,
            "bg-cryptoblue-200": !darkmode,
          })} />
        </div>  
      }
    </div>
  );
};
export default Date;