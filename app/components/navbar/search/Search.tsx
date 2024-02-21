import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import SearchResults from "./SearchResults";
const Search = () => {
  const [hidden, setHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const darkmode = useSelector(selectDarkmode);
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  let debounceTimer: NodeJS.Timeout;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            setSearchTerm(e.target.value);
        }, 300);
    };
  return (
    <div className="ml-4 relative">
        <div className="absolute pointer-events-auto">
            <svg className={clsx("absolute h-5 w-5 ml-3 mt-2", {
                "text-cryptoblue-900": !darkmode,
                "text-cryptodark-100": darkmode,
            })} viewBox="0 -2 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" />
            </svg>
        </div>
        <input 
        type="text" 
        placeholder="Search" 
        value={searchTerm}
        onChange={handleChange}
        onClick={toggleHidden}
        className={clsx("pl-10 h-10 box-border rounded", {
            "bg-cryptoblue-200 focus:border-cryptoblue-900": !darkmode,
            "bg-cryptodark-200 text-cryptodark-100 focus:border-cryptodark-620 focus:outline-none focus:shadow-inner": darkmode,
        })} />
        {!hidden && <SearchResults query={searchTerm} toggleHidden={toggleHidden} />}
</div>
  );
};
export default Search;
