import React, { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkmode, selectCoinOneSymbol, setCoinOneSymbol, setCoinTwoSymbol } from "@/app/lib/dynamicValuesSlice";
import SearchResults from "./SearchResults";
const Search = () => {
  const [hidden, setHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [coin, setCoin] = useState(["",""]);
  const darkmode = useSelector(selectDarkmode);
  const coinOne = useSelector(selectCoinOneSymbol);
  const dispatch = useDispatch();
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  const handleCoin = (coinId: string, coinSymbol: string) => setCoin([coinId, coinSymbol]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Escape") {
      clearSearch();
      e.currentTarget.blur();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedOptionIndex((prevIndex) => {
        return prevIndex + 1;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedOptionIndex((prevIndex) => {
        if (prevIndex < 0) return 0;
        return prevIndex - 1;
      });
    } else if (e.key === "Enter") {
      toggleHidden();
      clearSearch();
      dispatch(setCoinOneSymbol([coin[0], coin[1]]));
      dispatch(setCoinTwoSymbol(coinOne));
    } 
  };
  const clearSearch = () => {
    setSearchTerm("");
  };
  let debounceTimer: NodeJS.Timeout;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 500);
  };
  return (
    <div className="ml-4 relative">
      <div className="absolute pointer-events-auto">
        <svg className={clsx("absolute h-5 w-5 ml-4 mt-3.5", {
          "text-cryptoblue-900": !darkmode,
          "text-cryptodark-100": darkmode,
        })} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd" />
        </svg>
      </div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={handleChange}
        onClick={toggleHidden}
        onKeyDown={handleKeyDown}
        className={clsx("pl-12 h-12 w-72 box-border rounded-md  text-sm focus:outline-none", {
          "bg-cryptoblue-200 focus:border-cryptoblue-900": !darkmode,
          "bg-cryptodark-200 text-cryptodark-100 border-[1px] border-cryptodark-170 focus:outline-none focus:shadow-inner": darkmode,
        })} />
      {!hidden 
        && <SearchResults 
          index={selectedOptionIndex} 
          query={searchTerm} 
          toggleHidden={toggleHidden} 
          clearSearch={clearSearch}
          handleCoin={handleCoin}
        />}
    </div>
  );
};
export default Search;
