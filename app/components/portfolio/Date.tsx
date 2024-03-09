import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const Date = () => {
  const [visible, setVisible] = useState(false);
  const darkmode = useSelector(selectDarkmode);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      {!visible ? <div className={clsx("w-full text-xs flex justify-between py-2 px-2 rounded-sm",{
        "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-200 text-cryptodark-510": darkmode,
      })}
      >
        <p>Purchased Amount</p>
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
        <div  className={clsx("w-full text-xs flex justify-between py-[6.5px] px-2 rounded-sm",{
          "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
          "bg-cryptodark-200 text-cryptodark-510": darkmode,
        })}> 
          <input type="date" onChange={handleDate} className={clsx("",{
            "bg-cryptodark-200": darkmode,
          })}/>
          <input type="time" onChange={handleTime} className={clsx("",{
            "bg-cryptodark-200": darkmode,
          })} />
        </div>  
      }
    </div>
  );
};
export default Date;