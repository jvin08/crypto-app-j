import React, {useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const Amount = ({visible, toggleVisible, getAmount, placeholder}:{visible: boolean, toggleVisible: ()=>void, getAmount:any, placeholder: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const inputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (/^(?!0)\d+?$/.test(amount) || amount === "") {
      setAmount(amount);
    }
  };
  const handleBlur = () => {
    toggleVisible();
    if(amount){
      setAmount(amount);
      getAmount(amount);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [visible]);
  return (
    <div>
      {!visible ? <div className={clsx("w-full text-xs flex justify-center py-2 px-2 rounded-sm",{
        "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-400 text-cryptodark-510": darkmode,
      })}
      >
        {amount==="" ?  
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
          </svg> : <p onClick={toggleVisible}>{amount}</p>}
      </div> :
        <input 
          type="text" 
          ref={inputRef}
          placeholder={placeholder} 
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={clsx("w-full pl-4 h-8 box-border rounded-sm text-xs focus:outline-none focus:border-[1px]", {
            "bg-cryptoblue-200": !darkmode,
            "bg-cryptodark-200 text-cryptodark-510 focus:border-cryptodark-800 focus:outline-none focus:shadow-inner": darkmode,
          })} 
        />
      }
    </div>
  );
};
export default Amount;