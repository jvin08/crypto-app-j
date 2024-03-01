import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkmode, setCompare, selectCompare, setCoinOneSymbol, setCoinTwoSymbol } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
const Compare = () => {
  const dispatch = useDispatch();
  const shouldCompare = useSelector(selectCompare);
  const darkmode = useSelector(selectDarkmode);
  const handleClick = (e: any) => {
    e.preventDefault();
    if(shouldCompare){
      dispatch(setCoinOneSymbol(["bitcoin","btc"]));
      dispatch(setCoinTwoSymbol(["",""]));
      dispatch(setCompare(false));
    } else {
      dispatch(setCompare(true));
    }
  };
  const CompareBtn = () => {
    return <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 20H4V19.46L9 14.46L12.8 18.26C12.9874 18.4463 13.2408 18.5508 13.505 18.5508C13.7692 18.5508 14.0226 18.4463 14.21 18.26L21.71 10.76C21.8037 10.667 21.8781 10.5564 21.9289 10.4346C21.9797 10.3127 22.0058 10.182 22.0058 10.05C22.0058 9.91799 21.9797 9.78728 21.9289 9.66542C21.8781 9.54356 21.8037 9.43296 21.71 9.34C21.5226 9.15375 21.2692 9.04921 21.005 9.04921C20.7408 9.04921 20.4874 9.15375 20.3 9.34L13.5 16.14L9.71 12.34C9.52264 12.1537 9.26919 12.0492 9.005 12.0492C8.74081 12.0492 8.48736 12.1537 8.3 12.34L4 16.63V11.46L9 6.46L11.8 9.26C11.9874 9.44625 12.2408 9.55079 12.505 9.55079C12.7692 9.55079 13.0226 9.44625 13.21 9.26L18 4.47L20.19 6.66C20.3783 6.84698 20.6332 6.95149 20.8985 6.95056C21.1639 6.94962 21.418 6.8433 21.605 6.655C21.792 6.4667 21.8965 6.21183 21.8956 5.94646C21.8946 5.6811 21.7883 5.42698 21.6 5.24L18.69 2.35C18.5026 2.16375 18.2492 2.05921 17.985 2.05921C17.7208 2.05921 17.4674 2.16375 17.28 2.35L12.48 7.15L9.69 4.35C9.50264 4.16375 9.24919 4.05921 8.985 4.05921C8.72081 4.05921 8.46736 4.16375 8.28 4.35L4 8.63V3C4 2.73478 3.89464 2.48043 3.70711 2.29289C3.51957 2.10536 3.26522 2 3 2C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20Z" 
        fill={!darkmode ? "#353570" : "#FFFFFF"}  fillOpacity={1} />
    </svg>
    <p className="ml-3">Compare</p>
    </>;
  };
  const ExitCompareBtn = () => {
    return <>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" 
          stroke={!darkmode ? "#353570" : "#FFFFFF"} 
          strokeOpacity={1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p className="ml-3">Exit comparison</p>
    </>;
  };
  return (
    <div className="flex justify-between text-xs mt-8 w-full">
      <p className={clsx({
        "text-cryptoblue-900": !darkmode,
        "text-cryptoblue-500": darkmode
      })}>Select the currency to view statistics</p>
      <button  onClick={handleClick} className={clsx("flex items-center justify-center rounded py-2 px-4", {
        "bg-cryptoblue-200": shouldCompare && !darkmode,
        "bg-cryptoblue-100": !shouldCompare && !darkmode,
        "bg-cryptodark-150 text-cryptodark-100": darkmode,
      })}>
        {!shouldCompare ? <CompareBtn /> : <ExitCompareBtn />}
      </button>
    </div>
  );
};
export default Compare;
