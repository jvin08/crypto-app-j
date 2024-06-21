import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js/auto";
import {CrosshairPlugin} from "chartjs-plugin-crosshair";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { options } from "./options";
import { getChartData } from "./options";
import { Line } from "react-chartjs-2";
import { Header } from "./Header";
import useWindowWidth from "../hooks/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  CrosshairPlugin,
);
const Chart = ({data}:{data:number[][], coin: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const width = useWindowWidth();
  const lineChartData = getChartData(data);
  const [ priceIndex, setPriceIndex ] = React.useState<number>(data?.length - 1);
  options.onHover = (event: any, price: any) => {
    const priceIndex = price[0]?.index;
    priceIndex && setPriceIndex(priceIndex);
  };
  const curValue = data?.[priceIndex].at(0) as number;
  const lastValue = data?.slice(-1)[0].at(0) as number;
  const curTime = data?.[priceIndex].at(1) as number;
  const lastTime = data?.slice(-1)[0].at(1) as number;
  const isMobile = width < 481;
  return (
    <div className={clsx("sm:w-full w-[746.01px] mt-10 sm:mt-0 sm:h-[440px] h-[260px] z-[222] text-center text-2xl",{
      "bg-cryptodark-300": darkmode,
      "bg-cryptoblue-350": !darkmode,
    })}>
      <Header 
        price={curValue || lastValue} 
        priceDate={curTime || lastTime}
      />
      <div className="sm:h-[300px] h-[260px] -mt-4 sm:mt-24">
        <Line options={options} data={lineChartData} height={isMobile ? 300 : 260} />
      </div>
      
    </div>
  );
};
export default Chart;