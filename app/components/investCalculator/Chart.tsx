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
  return (
    <div className={clsx("w-[766.01px] mt-10 h-[260px] z-[222] text-center text-2xl",{
      "bg-cryptodark-300": darkmode,
      "bg-cryptoblue-350": !darkmode,
    })}>
      <Header 
        price={curValue || lastValue} 
        priceDate={curTime || lastTime}
      />
      <Line options={options} data={lineChartData} height={260} />
    </div>
  );
};
export default Chart;