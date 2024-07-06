import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {CrosshairPlugin} from "chartjs-plugin-crosshair";
import { useGetFearAndGreedDataQuery } from "@/app/lib/marketSlice";
import { getChartData, options } from "./options";
import { formatStandardDate, fiveYearFormat } from "../charts/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  CrosshairPlugin,
);
const GreedChart = ({range}:{range:number}) => {
  const { data } = useGetFearAndGreedDataQuery(range);
  const dateAdjuster = range === 1825 ? fiveYearFormat : formatStandardDate;
  const times = data?.data.map((item: any) => dateAdjuster(new Date(item.timestamp * 1000)));
  const values = data?.data.map((item: any) => Number(item.value));
  const chartData = getChartData(times, values);
  return (
    <div className={"sm:ml-0 mt-6 w-[410px] mx-auto ml-6 h-[180px] sm:h-[140px]"}>
      <Line options={options} data={chartData} height={180} />
    </div>
  );
};
export default GreedChart;