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
import {CrosshairPlugin} from "chartjs-plugin-crosshair";

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

const GreedChart = () => {
  return (
    <div className={"sm:ml-0 -ml-3 h-[200px] sm:h-[140px]"}>
      {/* <Line options={options} data={[1,2,3]} height={200} /> */}
    </div>
  );
};
export default GreedChart;
