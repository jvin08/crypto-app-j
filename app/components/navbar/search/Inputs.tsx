import React from "react";
import clsx from "clsx";
import useWindowWidth from "../../hooks/hooks";

type MobileInputProps = {
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHidden: () => void;
  // eslint-disable-next-line no-unused-vars
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  darkmode: boolean;
  hidden: boolean;
  showMobileSearch: boolean;
  toggleMobileSearch: () => void;
};
export const MobileInput = ({
  searchTerm, 
  handleChange, 
  toggleHidden, 
  handleKeyDown, 
  darkmode, 
  hidden, 
  showMobileSearch,
  toggleMobileSearch
}:MobileInputProps) => {
  const windowWidth = useWindowWidth();
  const searchWidth = "sm:" + windowWidth;
  return (
    <div className={clsx("",{
      "hidden": !showMobileSearch
    })}>
      <div className="sm:fixed left-[3%] top-[73px] w-[94%] z-40">
        <span className="absolute z-40 left-[5%] top-1.5">&#x1F50E;&#xFE0E;</span>
        <input
          type="text" 
          placeholder="Search for a coin..."
          value={searchTerm}
          onChange={handleChange}
          onClick={toggleHidden}
          onKeyDown={handleKeyDown}
          className={clsx(`${searchWidth} rounded-t-md pl-12 absolute left-0 -top-0.5 h-12 sm:h-10 w-full z-30 box-border text-sm focus:outline-none`, {
            "bg-cryptoblue-200 focus:border-cryptoblue-900": !darkmode,
            "bg-cryptodark-200 text-cryptodark-100 border-[1px] border-cryptodark-170 focus:outline-none focus:shadow-inner": darkmode,
            "rounded-md": hidden,
            "bg-gradient-to-r from-cryptodark-200 to-cryptodark-170": darkmode && !hidden
          })} />
        <button 
          className="absolute z-40 top-2.5 left-[90%] text-xs"
          onClick={toggleMobileSearch}  
        >&#9587;</button>
      </div>
    </div>
  );
};
type InputProps = {
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHidden: () => void;
  // eslint-disable-next-line no-unused-vars
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  darkmode: boolean;
  hidden: boolean;
};
export const DesktopInput = ({searchTerm, handleChange, toggleHidden, handleKeyDown, darkmode, hidden}:InputProps) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onClick={toggleHidden}
        onKeyDown={handleKeyDown}
        className={clsx("rounded-t-md pl-12 h-12 w-72 box-border text-sm focus:outline-none", {
          "bg-cryptoblue-200 focus:border-cryptoblue-900": !darkmode,
          "bg-cryptodark-200 text-cryptodark-100 border-[1px] border-cryptodark-170 focus:outline-none focus:shadow-inner": darkmode,
          "rounded-md": hidden,
          "bg-gradient-to-r from-cryptodark-200 to-dark-140": darkmode && !hidden
        })} />
    </div>
  );
};