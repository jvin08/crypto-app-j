import React from "react";

export const SmallIcon = ({active,darkmode}:{active:boolean,darkmode:boolean}) => {
  return (
    <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z" 
        stroke={active && !darkmode ? "#353570": !active ?"#9B9AB6" :  "#FFFFFF" } 
        strokeOpacity={1} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
    </svg>
  );
};
export const Icon = ({active,darkmode}:{active:boolean,darkmode:boolean}) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z" 
        stroke={active && !darkmode ? "#353570": !active ?"#9B9AB6" :  "#FFFFFF" } 
        strokeOpacity={1} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
    </svg>
  );
};
