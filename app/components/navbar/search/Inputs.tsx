import React from "react";
import clsx from "clsx";

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
  return (
    <div className={clsx("",{
      "hidden": !showMobileSearch
    })}>
      <div className="">
        <span className="absolute z-40 -left-[190px] top-[10px]">&#x1F50E;&#xFE0E;</span>
        <input
          type="text" 
          placeholder="Search for a coin..."
          value={searchTerm}
          onChange={handleChange}
          onClick={toggleHidden}
          onKeyDown={handleKeyDown}
          className={clsx("pl-12 absolute -left-[205px] -top-0.5 h-12 w-[376px] z-30 box-border text-sm focus:outline-none", {
            "bg-cryptoblue-200 focus:border-cryptoblue-900": !darkmode,
            "bg-cryptodark-200 text-cryptodark-100 border-[1px] border-cryptodark-170 focus:outline-none focus:shadow-inner": darkmode,
            "rounded-md": hidden,
            "rounded-t-md bg-gradient-to-r from-cryptodark-200 to-dark-140": !hidden
          })} />
        <button 
          className="absolute z-40 top-3 left-[140px] text-xs"
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
        className={clsx("pl-12 h-12 w-72 box-border text-sm focus:outline-none", {
          "bg-cryptoblue-200 focus:border-cryptoblue-900": !darkmode,
          "bg-cryptodark-200 text-cryptodark-100 border-[1px] border-cryptodark-170 focus:outline-none focus:shadow-inner": darkmode,
          "rounded-md": hidden,
          "rounded-t-md bg-gradient-to-r from-cryptodark-200 to-dark-140": !hidden
        })} />
    </div>
  );
};