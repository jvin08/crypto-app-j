import React from "react";
import clsx from "clsx";
import Image from "next/image";
import CustomButton from "../portfolioModal/CustomButton";
import { capitalize } from "../coinPortfolioItem/utils";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";  
import { useLocalStorage } from "../portfolioModal/hooks";

const DeleteModal = ({toggleDeleteModal, id, handleCoinAdded}:{toggleDeleteModal: any, id: string, handleCoinAdded: ()=>void}) => {
  const [storedValue, setValue] = useLocalStorage();
  const deleteCoinFromLocalStorage = (id: string) => {
    setValue(storedValue.filter((coin:any) => coin.id !== id));
    handleCoinAdded();
    toggleDeleteModal();
  };
  const coin = storedValue.find((coin:any) => coin.id === id);
  const coinImage = coin.image;
  const coinName = capitalize(coin.coin);
  const coinSymbol = coin.symbol;
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-45 backdrop-blur-[1px] w-full h-full">
      <div className="absolute left-[calc(50%-15rem)] top-[12rem] rounded-[20px]">
        <div className={clsx("m-auto w-[30rem] z-50 p-12 rounded-[20px] text-xl",{
          "bg-cryptodark-400 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <p className="text-center">Please confirm transaction for this coin</p>
          <div className={clsx("rounded-[15px] size-[110px] pt-5 mx-auto my-6",{
            "bg-cryptodark-160": darkmode,
            "bg-cryptoblue-200": !darkmode,
          })}>
            <div className="w-[50px] h-[50px] mx-auto mt-2.5">
              <Image src={coinImage} width={50} height={50} alt="coin image" />
            </div>
          </div>
          <p className="text-center text-cryptoblue-500">{coinName} ({coinSymbol})</p>
          <div className="flex items-center justify-evenly mt-5">
            <CustomButton 
              name="Cancel"
              handleClick={toggleDeleteModal}
              active={true}
              width="w-[10rem]"
              padding="px-auto py-3"
              disabled={false}
            />
            <CustomButton
              name="Delete"
              handleClick={()=>deleteCoinFromLocalStorage(id)}
              active={true}
              width="w-[10rem]"
              padding="px-auto py-3"
              disabled={false} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;