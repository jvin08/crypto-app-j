import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
export const EditInfoSVG = () => {
  const darkmode = useSelector(selectDarkmode);
  const buttonColor = darkmode ? "#3A3978" : "#7878FA";
  return (
    <svg className="cursor-pointer hover:opacity-70 hover:border-cryptoblue-800 hover:border-[1px] box-border hover:rounded" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill={buttonColor} />
      <path d="M21.2594 11.6002L13.0494 20.2902C12.7394 20.6202 12.4394 21.2702 12.3794 21.7202L12.0094 24.9602C11.8794 26.1302 12.7194 26.9302 13.8794 26.7302L17.0994 26.1802C17.5494 26.1002 18.1794 25.7702 18.4894 25.4302L26.6994 16.7402C28.1194 15.2402 28.7594 13.5302 26.5494 11.4402C24.3494 9.37022 22.6794 10.1002 21.2594 11.6002Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.8906 13.0498C20.3206 15.8098 22.5606 17.9198 25.3406 18.1998" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 30H29" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
