import React from "react";
import { formatDateAndTime } from "./utils";
import { colors } from "./StatusBar";
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
);
export const options = {
  elements: {
    point: {
      radius: 50,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  hitRadius: 250,
  scales: {
    y: {
      display: false, // Hide Y-axis values
      ticks: {
        display: false,
      },
    },
    x: {
      // You can customize the X-axis as needed
      display: false,
      categoryPercentage: 0.26,
      ticks: {
        display: false,
      },
      grid: {
        display: false, // Hide grid lines on X-axis
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: true, // Hide the tooltip
      backgroundColor: "rgba(0, 0, 0, 0)",
      caretSize: 5,
      caretPadding: 1,
      displayColors: false,
    },
    legend: {
      display: false,
    },
  },
};
const Chart = ({data, index}:{data: number[], index: number}) => {  
  const time = Array.from({ length: 168 }, (_, i) => i);
  const isLoaded = data.length > 0;
  const chartData ={
    labels: time.map((hour) => formatDateAndTime(167 - hour)),
    datasets: [
      {
        fill: true,
        tension: 0.75,
        label: "$",
        data: data,
        borderColor: colors[index % 10],
        borderWidth: 1.5,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 380);
          gradient.addColorStop(0, colors[index % 10]);
          gradient.addColorStop(0.15, "rgba(120, 120, 250, 0)");
          return gradient;
        },
      },
    ],
  };
  return (
    <div className="ml-8">
      {isLoaded ? <Line options={options} data={chartData} width={100} height={60} /> : <div className="w-[100px]">n/a</div>}
    </div>
  );
};
export default Chart;