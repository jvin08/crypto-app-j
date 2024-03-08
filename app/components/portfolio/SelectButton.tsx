import React from "react";
import clsx from "clsx";
const SvgButton = ({toggleSearch, darkmode, name}:{toggleSearch: ()=>void, darkmode: boolean, name: string}) => {
  return (
    <div className={clsx("flex justify-between p-2 rounded-sm",{
      "bg-cryptodark-200 text-cryptodark-510": darkmode,
      "bg-cryptoblue-400 ": !darkmode,
    })}>
      <p>{name}</p>
      <svg 
        className="cursor-pointer" 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleSearch}
      >
        <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
          fill={clsx("",{
            "white": darkmode,
            "#3D3D7E": !darkmode,
          })}
        />
      </svg>
    </div>
  );
};
export default SvgButton;