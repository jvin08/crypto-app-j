import React, {useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const Amount = ({visible, onToggle, getAmount, name, placeholder}:{visible: boolean, onToggle: ()=>void, getAmount:any, name: string, placeholder: string}) => {
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
    onToggle();
    if(amount){
      setAmount(amount);
      getAmount(name, amount);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [visible]);
  return (
    <div>
      {!visible ? <div className={clsx("sm:h-10 rounded-sm sm:items-center",{
        "bg-cryptoblue-350 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-300 text-cryptodark-510": darkmode,
      })}
      >
        {amount==="" ?  
          <svg 
            className="cursor-pointer" 
            width="32" 
            height="32" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onClick={onToggle}
          >
            <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
              fill={clsx("",{
                "white": darkmode,
                "#3D3D7E": !darkmode,
              })}
            />
          </svg> : <p onClick={onToggle}>{amount}</p>}
      </div> :
        <input 
          type="text" 
          ref={inputRef}
          placeholder={placeholder} 
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={clsx("w-full sm:h-[41px] pr-2 h-[52px] box-border rounded-lg text-base focus:outline-none focus:border-[1px] text-center", {
            "bg-cryptoblue-100": !darkmode,
            "bg-cryptodark-200 text-cryptodark-510 focus:border-cryptodark-800 focus:outline-none focus:shadow-inner": darkmode,
          })} 
        />
      }
    </div>
  );
};
export default Amount;