import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { isPositive } from "../coinPage/utils";

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
export const EditMobileInfoSVG = () => {
  const darkmode = useSelector(selectDarkmode);
  const buttonColor = darkmode ? "#3A3978" : "#7878FA";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill={buttonColor} />
      <path d="M12.8396 6.4008L7.36624 12.1941C7.15958 12.4141 6.95958 12.8475 6.91958 13.1475L6.67291 15.3075C6.58624 16.0875 7.14624 16.6208 7.91958 16.4875L10.0662 16.1208C10.3662 16.0675 10.7862 15.8475 10.9929 15.6208L16.4662 9.82746C17.4129 8.82746 17.8396 7.68746 16.3662 6.29413C14.8996 4.91413 13.7862 5.4008 12.8396 6.4008Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9258 7.36719C12.2124 9.20719 13.7058 10.6139 15.5591 10.8005" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 18.666H18" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
export const Triangle = ({percentage}:{percentage:number}) => {
  return (
    <>
      <svg transform={isPositive(percentage) ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={isPositive(percentage) ? "#00B1A7" : "#FE2264"} fillOpacity={1}/>
      </svg>
    </>
  );
};
export const MobTriangle = ({percentage}:{percentage:number}) => {
  return (
    <>
      <svg transform={isPositive(percentage) ? "rotate(0)" : "rotate(180)"} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" fill={isPositive(percentage) ? "#00B1A7" : "#FE2264"}  d="M4.64061 1.24808C5.03643 0.654343 5.90888 0.654342 6.30471 1.24808L10.4362 7.4453C10.8792 8.10985 10.4028 9 9.60414 9H1.34117C0.542478 9 0.0660865 8.10985 0.509123 7.4453L4.64061 1.24808Z"/>
      </svg>
    </>
  );
};
