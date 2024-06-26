import React, {useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const Amount = ({visible, toggleVisible, getAmount}:{visible: boolean, toggleVisible: ()=>void, getAmount:any}) => {
  const darkmode = useSelector(selectDarkmode);
  const inputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (/^\d+(\.\d{0,2})?$/.test(amount) || amount === "") {
      setAmount(amount);
    }
  };
  const handleBlur = () => {
    toggleVisible();
    if(amount){
      setAmount(Number(amount).toFixed(2));
      getAmount(Number(amount).toFixed(2));
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [visible]);
  return (
    <div>
      {!visible ? <div className={clsx("sm:mb-2 sm:mt-2 w-full text-base items-center flex justify-between h-11 px-4 rounded",{
        "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-200 text-cryptodark-510": darkmode,
      })}
      >
        {amount==="" ? <p>Purchased Amount</p> : <p>{amount}</p>}
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
        <input 
          type="text" 
          ref={inputRef}
          placeholder="e.g. 1.00" 
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={clsx("w-full sm:mb-2 sm:mt-2 pl-4 h-11 box-border rounded text-base focus:outline-none focus:border-[1px]", {
            "bg-cryptoblue-200": !darkmode,
            "bg-cryptodark-200 text-cryptodark-510 focus:border-cryptodark-800 focus:outline-none focus:shadow-inner": darkmode,
          })} 
        />
      }
    </div>
  );
};
export default Amount;