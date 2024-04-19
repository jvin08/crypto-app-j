import { beforeFit } from "../charts/options";
export const options = {
  onHover:{} as any,
  interaction: {
    intersect: false,
    mode: "x" as "x",
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 5,
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      titleColor: "#7878FA",
      titleFont: {
        family: "Arial",
        size: 12,
      },
      intersect: false,
      callbacks: {
        label: () => {
          return "";
        }
      },
      borderWidth: 0.3,
      padding: {
        top: 2,
        left: 5,
        right: 5,
      },
      cornerRadius: 5,
    },
    crosshair: {
      line: {
        color: "#7878FA",
        dashPattern: [5, 5],
        width: 0.25,
      },
      sync: {
        enabled: false,
      },
      zoom: {
        enabled: true,                             
        zoomboxBackgroundColor: "rgba(120, 120, 250, 0.2)",
        zoomboxBorderColor: "#7878FA",
        zoomButtonText: "Reset Zoom",
        zoomButtonClass: "reset-zoom",
      },
    },
    legend: {
      display: false,
    },
  },  
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: false, // Hide Y-axis values
      ticks: {
        display: false,
      },
    },
    x: {
      display: true,
      beforeFit: beforeFit,
      ticks: {
        maxTicksLimit: 13,
        color: "#9B9AB6",
        fontColor: "white",
        fontSize: 8,
        backdropColor: "red",
        zeroLineColor: "transparent",
        align: "inner" as "inner",
      },
      grid: {
        display: false, // Hide grid lines on X-axis
      },
    },
  }, 
};
export const getChartData = (time: number[], prices: number[], pricesTwo: number[], coinOne: string, coinTwo: string) => {
  const pricesTwoUpdated = coinTwo === "" ? [] : pricesTwo;
  const borderWidth = 1.5;
  return {
    labels: time,
    datasets: [
      {
        fill: true,
        tension: 0.75,
        label: "",
        data: prices,
        borderColor: "#7878FA",
        borderWidth: borderWidth,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#7878FA");
          gradient.addColorStop(0.45, "rgba(120, 120, 250, 0)");
          return gradient;
        },
      },
      {
        fill: true,
        tension: 0.75,
        label: ` - ${coinTwo} $`,
        data: pricesTwoUpdated,
        borderColor: "#D878FA",
        borderWidth: borderWidth,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#D878FA");
          gradient.addColorStop(0.55, "rgba(216, 120, 250, 0)");
          return gradient;
        },
      },
    ],
  };
};
