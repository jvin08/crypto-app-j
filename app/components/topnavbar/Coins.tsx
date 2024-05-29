import React from "react";

const Coins = ({ quantity }: {quantity: number}) => {
  return (
    <div className="flex items-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00065 1.33301C4.32065 1.33301 1.33398 4.31967 1.33398 7.99967C1.33398 11.6797 4.32065 14.6663 8.00065 14.6663C11.6807 14.6663 14.6673 11.6797 14.6673 7.99967C14.6673 4.31967 11.6807 1.33301 8.00065 1.33301ZM10.354 8.81967L6.90065 11.213C6.39398 11.5663 6.10065 11.3597 6.24732 10.7663L6.88065 8.20634L5.78065 7.93301C5.28065 7.81301 5.22065 7.46634 5.64065 7.17301L9.09398 4.77967C9.60065 4.42634 9.89398 4.63301 9.74732 5.22634L9.11398 7.78634L10.214 8.05967C10.714 8.18634 10.774 8.52634 10.354 8.81967Z" fill="white" fillOpacity={1}/>
      </svg>
      <p className="ml-2">Coins</p>
      <p className="ml-4">{quantity}</p>
    </div>
  );
};
export default Coins;
