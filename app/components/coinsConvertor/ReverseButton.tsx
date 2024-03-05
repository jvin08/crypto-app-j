import React from "react";
const ReverseButton = () => {
  return (
    <div 
      className="absolute top-[calc(50%-24px)] left-[calc(50%-24px)] cursor-pointer hover:opacity-60"
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="24" fill="white"/>
        <path d="M14.5 28L18.5 32M18.5 32L22.5 28M18.5 32L18.5 18C18.5 16.8954 19.3954 16 20.5 16V16" stroke="#3D3D7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25.5 20L29.5 16M29.5 16L33.5 20M29.5 16L29.5 31C29.5 32.1046 28.6046 33 27.5 33V33" stroke="#3D3D7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};
export default ReverseButton;