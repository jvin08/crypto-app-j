import React from "react";
import clsx from "clsx";

export const IconSearch = ({darkmode}:{darkmode:boolean}) => {
  return (
    <svg className={clsx("absolute h-5 w-5 ml-4 mt-3.5 sm:left-[6px] sm:ml-1 sm:-mt-2", {
      "text-cryptoblue-900": !darkmode,
      "text-cryptodark-100": darkmode,
    })} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
        clipRule="evenodd" />
    </svg>
  );
};
export const MobileSearch = ({darkmode}:{darkmode:boolean}) => {
  return (
    <svg  className={clsx("h-9 w-5", {
      "text-cryptoblue-900": !darkmode,
      "text-cryptodark-100": darkmode,
    })} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.66536 14.0007C11.1632 14.0007 13.9987 11.1651 13.9987 7.66732C13.9987 4.16951 11.1632 1.33398 7.66536 1.33398C4.16756 1.33398 1.33203 4.16951 1.33203 7.66732C1.33203 11.1651 4.16756 14.0007 7.66536 14.0007Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14.6654 14.6673L13.332 13.334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
