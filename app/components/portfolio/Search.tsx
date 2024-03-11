import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import SearchResults from "./SearchResults";
const Search = ({handleCoin}:{handleCoin:any}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const darkmode = useSelector(selectDarkmode);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
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
  useEffect(() => {
    inputRef.current?.focus();
  }, [showSearch]);
  return (
    <div className="relative w-full">
      {!showSearch ? <div className={clsx("w-full text-xs flex justify-between py-2 px-2 rounded-sm",{
        "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-200 text-cryptodark-510": darkmode,
      })}
      >
        {searchTerm==="" ? <p>Select Coin</p> : <p>{searchTerm}</p>}
        <svg 
          className="cursor-pointer" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleSearch}
        >
          <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
            fill={clsx("",{
              "white": darkmode,
              "#3D3D7E": !darkmode,
            })}
          />
        </svg>
      </div>:
        <div>
          <input 
            type="text" 
            ref={inputRef}
            placeholder="e.g. Bitcoin" 
            value={searchTerm}
            onChange={handleChange}
            className={clsx("w-full pl-4 h-8 box-border rounded-sm text-xs focus:outline-none focus:border-[1px]", {
              "bg-cryptoblue-200": !darkmode,
              "bg-cryptodark-200 text-cryptodark-510 focus:border-cryptodark-800 focus:outline-none focus:shadow-inner": darkmode,
            })} 
          />
          <SearchResults 
            query={searchTerm} 
            toggleSearch={toggleSearch} 
            clearSearch={clearSearch} 
            handleCoin={handleCoin}
          />
        </div>
      }
    </div>
  );
};
export default Search;
