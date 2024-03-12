import { useState, useEffect, useRef } from "react";
export const useLocalStorage = () => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem("coins");
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });
  const setValue = (value:any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem("coins", JSON.stringify(valueToStore));
  };
  return [storedValue, setValue];
};
export const useClickOutside = (callback: Function) => {
  const ref = useRef<any>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);
  return ref;
};
