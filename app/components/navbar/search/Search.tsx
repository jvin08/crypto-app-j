import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import SearchResults from "./SearchResults";
import { useRouter } from "next/navigation";
import useWindowWidth from "../../hooks/hooks";
import { IconSearch, MobileSearch } from "./IconSearch";
import path from "path";
import { MobileInput, DesktopInput } from "./Inputs";

const Search = () => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const [hidden, setHidden] = useState(true);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [coin, setCoin] = useState(["",""]);
  const darkmode = useSelector(selectDarkmode);
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  const toggleMobileSearch = () => {
    setMobileSearch(!mobileSearch);
  };
  const handleCoin = useCallback((coinId: string, coinSymbol: string) => setCoin([coinId, coinSymbol]),[]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Escape") {
      clearSearch();
      e.currentTarget.blur();
      toggleHidden();
      toggleMobileSearch();
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
      e.currentTarget.blur();
      router.push(path.join("/coin", coin[0]) + "market");
      toggleHidden();
      toggleMobileSearch();
      clearSearch();
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
  const smScreen = windowWidth < 481;
  return (
    <div className="sm:ml-2 ml-4 relative sm:max-w-[480px] sm:-left-0">
      {smScreen
        ? <button onClick={toggleMobileSearch} className="flex items-center">
          <MobileSearch darkmode={darkmode} />
        </button>
        : <div className="absolute pointer-events-auto">
          <IconSearch darkmode={darkmode} />
        </div>}
      {smScreen
        ? (createPortal(<MobileInput 
          searchTerm={searchTerm}
          handleChange={handleChange}
          toggleHidden={toggleHidden}
          handleKeyDown={handleKeyDown}
          darkmode={darkmode}
          hidden={hidden}
          toggleMobileSearch={toggleMobileSearch}
          showMobileSearch={mobileSearch}
        />, document.body))
        : <DesktopInput 
          searchTerm={searchTerm}
          handleChange={handleChange}
          toggleHidden={toggleHidden}
          handleKeyDown={handleKeyDown}
          darkmode={darkmode}
          hidden={hidden}
        />
      }
      {!hidden 
        && (smScreen ? (createPortal(<SearchResults 
          index={selectedOptionIndex} 
          query={searchTerm} 
          toggleHidden={toggleHidden} 
          clearSearch={clearSearch}
          handleCoin={handleCoin}
          toggleMobileSearch={toggleMobileSearch}
        />, document.body)) : <SearchResults 
          index={selectedOptionIndex} 
          query={searchTerm} 
          toggleHidden={toggleHidden} 
          clearSearch={clearSearch}
          handleCoin={handleCoin}
          toggleMobileSearch={toggleMobileSearch}
        />)}
    </div>
  );
};
export default Search;
