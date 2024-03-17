import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { selectDarkmode, selectNotification, selectShowNotification, setShowNotification } from "@/app/lib/dynamicValuesSlice";
const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);
  const notify = useSelector(selectShowNotification);
  const darkmode = useSelector(selectDarkmode);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if(notify === ""){
      setIsVisible(true);
      setMessage("Loading...");
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setMessage(notification);
        setIsVisible(false);
        dispatch(setShowNotification("hidden"));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notify, dispatch, notification]);
  return (
    <div className={clsx("notification right-4 z-[100] absolute w-[240px] rounded-md p-[1px] backdrop-blur-2", {
      "visible": isVisible,
      "bg-gradient-to-t from-cryptoblue-670 to-cryptoblue-650": darkmode,
      "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800": !darkmode,
    })}>
      {isLoading ? 
        <div className="z-40 absolute top-4 left-4 loading"></div> :
        <svg className="z-40 absolute top-3 left-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="white" opacity="1"/>
        </svg>}
      <p className="z-40 absolute top-4 left-12">{message}</p>
      <div className={clsx("h-[48px]",{
        "bg-cryptoblue-670 rounded-[6px] opacity-55 backdrop-blur-2 ": darkmode,
      })}>
      </div>
    </div>
  );
};
export default Notification;