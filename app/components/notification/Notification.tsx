import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Check, Triangle } from "./CheckSVG";
import clsx from "clsx";
import { selectDarkmode, selectNotification, selectShowNotification, setShowNotification, selectError } from "@/app/lib/dynamicValuesSlice";
const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);
  const notify = useSelector(selectShowNotification);
  const darkmode = useSelector(selectDarkmode);
  const error = useSelector(selectError);
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
      "bg-gradient-to-t from-cryptoblue-670 to-cryptoblue-650": !error,
      "bg-gradient-to-t from-cryptoblue-760 to-cryptoblue-750": error,
    })}>
      {isLoading ? 
        <div className="z-40 absolute top-4 left-4 loading"></div> :
        error 
          ? <Triangle /> 
          : <Check />
      }
      <p className="z-40 absolute top-4 left-12">{message}</p>
      <div className={clsx("h-[48px]",{
        "bg-cryptoblue-670 rounded-[6px] opacity-55 backdrop-blur-2 ": darkmode,
      })}>
      </div>
    </div>
  );
};
export default Notification;