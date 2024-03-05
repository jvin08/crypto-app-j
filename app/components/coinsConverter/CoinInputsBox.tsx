import React, { useState } from "react";
import CoinInput from "./CoinInput";
import ReverseButton from "./ReverseButton";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useGetOneCoinDataQuery } from "@/app/lib/marketSlice";
import { selectCurrency, selectDarkmode, selectCoinOneSymbol, selectCoinTwoSymbol, setCoinOneSymbol, setCoinTwoSymbol } from "@/app/lib/dynamicValuesSlice";
const CoinInputsBox = () => {
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  const coinOneSymbol = useSelector(selectCoinOneSymbol);
  const coinTwoSymbol = useSelector(selectCoinTwoSymbol);
  const dispatch = useDispatch();
  const queryCoinOne = `${coinOneSymbol[0]}`;
  const { data: coinOne } = useGetOneCoinDataQuery(queryCoinOne);
  const priceOne = coinOne?.market_data?.current_price[currency.label.toLowerCase()];
  const coinTwoDefault = coinTwoSymbol[0] === "" ? ["ethereum","eth"] : coinTwoSymbol;
  const queryCoinTwo = `${coinTwoDefault[0]}`;
  const { data: coinTwo } = useGetOneCoinDataQuery(queryCoinTwo);
  const priceTwo = coinTwo?.market_data?.current_price[currency.label.toLowerCase()];
  const [inputOne, setInputOne] = useState(priceOne && 1);
  const [inputTwo, setInputTwo] = useState(priceOne && Number((inputOne * priceOne / priceTwo).toFixed(5)));
  const flipCoins = () => {
    dispatch(setCoinOneSymbol(coinTwoDefault));
    dispatch(setCoinTwoSymbol(coinOneSymbol));
    setInputOne(inputTwo);
    setInputTwo(inputOne);
  };
  const handleChangeOne = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(Number(e.target.value))) {
      setInputOne(Number(e.target.value));
      const inputTwo = (Number(e.target.value) * Number(priceOne) / Number(priceTwo)).toFixed(5);
      setInputTwo(Number(inputTwo));
    }
  };
  const handleChangeTwo = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(Number(e.target.value))) {
      setInputTwo(Number(e.target.value));
      const inputOne = (Number(e.target.value) * Number(priceTwo) / Number(priceOne)).toFixed(5);
      setInputOne(Number(inputOne));
    }
  };
  return (
    <div className={clsx("flex w-full justify-between mt-6 mb-6 relative",{})}>
      <CoinInput 
        header="You buy" 
        darkmode={darkmode} 
        coin={coinOneSymbol} 
        price={priceOne} 
        image={coinOne?.image?.large}
        inputValue={inputOne}
        handleChange={handleChangeOne}
        margin="mr-3"
      />
      <ReverseButton flipCoins={flipCoins} />
      <CoinInput 
        header="You sell" 
        darkmode={darkmode} 
        coin={coinTwoDefault} 
        price={priceTwo} 
        image={coinTwo?.image?.large} 
        inputValue={inputTwo}
        handleChange={handleChangeTwo}
        margin="ml-3"
      />
    </div>
  );
};
export default CoinInputsBox;