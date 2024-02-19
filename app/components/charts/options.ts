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
          titleFont: {
            family: "Arial",
            size: 10,
            color: "yellow",
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
        ticks: {
          maxTicksLimit: 8,
        },
        grid: {
          display: false, // Hide grid lines on X-axis
        },
      },
    }, 
  };
  export const barOptions = {
    onHover: {} as any,
    animations: {} as any,
    interaction: {
        intersect: false,
        mode: "x" as "x",
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false, // Hide Y-axis values
        stacked: true,
        ticks: {
          display: false,
        },
      },
      x: {
        // You can customize the X-axis as needed
        display: true,
        stacked: true,
        barPercentage: 0.6, // Adjust this value to control the width of the bars
        categoryPercentage: 0.59,// Adjust this value to lift the bars more from the x-axis
        ticks: {
          maxTicksLimit: 8, // Max number of X-axis ticks
        },
        grid: {
          display: false, // Hide grid lines on X-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        position: "average" as "average",
        intersect: false,
        callbacks: {
          label: () => {
            return "";
          }
        }
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
            gradient.addColorStop(0.6, "rgba(120, 120, 250, 0)");
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
                gradient.addColorStop(0.6, "rgba(216, 120, 250, 0)");
                return gradient;
            },
            },
    ],
    };
};
export const barChartData = (barTimePoints: string[], volumeOne: number[][], volumeTwo: number[][]) => {
  const period = volumeOne?.length;
    const borderWidth = 0; 
    return {
    labels: barTimePoints,
    datasets: [
        {
        fill: true,
        tension: 0.75,
        label: "",
        data: volumeOne?.map((item)=>item[1]),
        borderColor: "#7878FA",
        borderWidth: borderWidth,
        borderRadius: 6,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 380);
            gradient.addColorStop(0, "#7878FA");
            gradient.addColorStop((period > 746 ? 0.8 : period === 365 ? 0.7 : 0.6), "rgba(120, 120, 250, 0)");
            return gradient;
        },
        },
        {
            fill: true,
            tension: 0,
            label: "",
            data: volumeTwo?.map((item)=>item[1]),
            borderColor: "#D878FA",
            borderWidth: borderWidth,
            borderRadius: 6,
            categoryPercentage: 0.75,
            backgroundColor: (context: any) => {
                const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "#D878FA");
                gradient.addColorStop((period > 746 ? 0.8 : period === 365 ? 0.7 : 0.6), "rgba(216, 120, 250, 0)");
                return gradient;
            },
            },
    ],
    };
};