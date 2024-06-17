import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkmode, setNotification, setShowNotification } from "@/app/lib/dynamicValuesSlice";
import { usePathname } from "next/navigation";
import { Icon, SmallIcon } from "./Icon";
import useWindowWidth from "../../hooks/hooks";

const Home = () => {
  const windowWidth = useWindowWidth();
  const darkmode = useSelector(selectDarkmode);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const handleNotification = (message: string) => {
    dispatch(setNotification(message));
    dispatch(setShowNotification(""));
  };
  const active = pathname === "/";
  const converter = pathname === "/converter";
  const coinPage = pathname.startsWith("/coin");
  const isMobile = windowWidth < 481;
  return (isMobile ? 
    <div>
      {active || converter || coinPage ? <div className={clsx("h-8 w-8 rounded-md p-[1px]", {
        "bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800": !darkmode,
        "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800 shadow-2xl shadow-cryptoblue-800": darkmode,
      })}>
        <div  className={clsx("text-sm w-full h-full rounded-[5px] flex",{
          "bg-cryptodark-750": darkmode,
          "bg-cryptoblue-600 text-cryptoblue-100": !darkmode,
        })}>
          <div className="m-auto">
            <SmallIcon active={active || converter} darkmode={darkmode} />
          </div>
        </div>
      </div>
        : <Link className={clsx("text-sm flex justify-start items-center h-8 w-[108px] rounded-md",{
          "bg-cryptodark-150" : darkmode,
          "bg-cryptoblue-100" : !darkmode,
        })} href="/" onClick={()=>handleNotification("open home page")}>
          <div className="mr-2">
            <Icon active={active} darkmode={darkmode} />
          </div>
          <p className="mr-auto">Home</p>
        </Link>}
    </div>
    : <div className="flex items-center">
      <Icon active={active} darkmode={darkmode} />
      <Link className={clsx("ml-2.5 text-sm",{
        "text-cryptoblue-900" : active && !darkmode,
        "text-cryptoblue-500" : !active,
        "text-cryptodark-100" : active && darkmode,
      })} href="/" onClick={()=>handleNotification("open home page")}>Home</Link>
    </div>
  );
};
export default Home;
