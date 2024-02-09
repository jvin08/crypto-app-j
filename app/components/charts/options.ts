export const options = {
    responsive: true,
    maintainAspectRatio: false,
    hitRadius: 50,
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
        categoryPercentage: 0.55,
        ticks: {
          display: false,
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
    },
  };
  export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    hitRadius: 50,
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
        display: false,
        stacked: true,
        barPercentage: 0.6, // Adjust this value to control the width of the bars
        categoryPercentage: 0.59,// Adjust this value to lift the bars more from the x-axis
        ticks: {
          display: false,
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
        label: ` - ${coinOne} $`,
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
export const barChartData = (volumeOne: number[][], volumeTwo: number[][], coinOne: string, coinTwo: string) => {
let dataOne: number[][] = [];
let dataTwo: number[][] = [];
const period = volumeOne?.length;
    switch (true) {
        case period < 95: 
        dataOne = volumeOne?.filter(item=>{
            const day = new Date(item[0]).getDay();
            if(day === 1 || day === 5 || day === 10 || day === 15 || day === 20 || day === 25){
                return item;
            }
        });
        dataTwo = volumeTwo?.filter(item=>{
            const day = new Date(item[0]).getDay();
            if(day === 1 || day === 5 || day === 10 || day === 15 || day === 20 || day === 25){
                return item;
            }
        });
        break;
        case period < 170:
            dataOne = volumeOne?.filter(item=>{
                const hours = new Date(item[0]).getHours();
                if(hours === 0 || hours === 6 || hours === 12 || hours === 18){
                    return item;
                }
            });
            dataTwo = volumeTwo?.filter(item=>{
                const hours = new Date(item[0]).getHours();
                if(hours === 0 || hours === 6 || hours === 12 || hours === 18){
                    return item;
                }
            });
            break;
        case period < 300:
            dataOne = volumeOne?.filter(item => {
                const minutes = new Date(item[0]).getMinutes();
                if(minutes >= 0 &&  minutes < 6 || minutes > 55 && minutes <= 0){
                    return item;
                }
            });
            dataTwo = volumeTwo?.filter(item => {
                const minutes = new Date(item[0]).getMinutes();
                if(minutes >= 0 &&  minutes < 6 || minutes > 55 && minutes <= 0){
                    return item;
                }
            });
            break;
        case period < 338: 
            dataOne = volumeOne?.filter(item=>{
                const hours = new Date(item[0]).getHours();
                if(hours === 0 || hours === 12){
                    return item;
                }
            });
            dataTwo = volumeTwo?.filter(item=>{
                const hours = new Date(item[0]).getHours();
                if(hours === 0 || hours === 12){
                    return item;
                }
            });
            break;
            case period < 367: 
            dataOne = volumeOne?.filter(item=>{
                const day = new Date(item[0]).getDay();
                if(day === 1){
                    return item;
                }
            });
            dataTwo = volumeTwo?.filter(item=>{
                const day = new Date(item[0]).getDay();
                if(day === 1){
                    return item;
                }
            });
            break;
            case period < 746: 
            dataOne = volumeOne?.filter(item=>{
                const hours = new Date(item[0]).getHours();
                if(hours === 12){
                    return item;
                }
            });
            dataTwo = volumeTwo?.filter(item=>{
                const hours = new Date(item[0]).getHours();
                if(hours === 12){
                    return item;
                }
            });
            break;
            case period < 2000: 
            dataOne = volumeOne?.filter((item, index)=>{
                const day = new Date(item[0]).getDay();
                const month = new Date(item[0]).getMonth();
                if(day === 1 && month === 1 || day === 1 && month === 4 || day === 1 && month === 8 || index === 0 || index === volumeOne?.length-1){
                    return item;
                }
            });
            dataTwo = volumeTwo?.filter((item, index)=>{
                const day = new Date(item[0]).getDay();
                const month = new Date(item[0]).getMonth();
                if(day === 1 && month === 1 || day === 1 && month === 4 || day === 1 && month === 8 || index === 0 || index === volumeOne?.length-1){
                    return item;
                }
            });
            break;
        default:
            break;
    }
    const timePoints = dataOne?.map(item=> new Date(item[0]));
    const volumesOne = dataOne?.map(item=> item[1]);
    const volumesTwo = dataTwo?.map(item=> item[1]);
    const updatedVolumesTwo = coinTwo === "" ? [] : volumesTwo;
    const borderWidth = 0;
    // console.log("length ", volumeOne?.length)              
    return {
    labels: timePoints,
    datasets: [
        {
        fill: true,
        tension: 0.75,
        label: ` - ${coinOne} $`,
        data: volumesOne,
        borderColor: "#7878FA",
        borderWidth: borderWidth,
        pointRadius: 0,
        backgroundColor: (context: any) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "#7878FA");
            gradient.addColorStop(0.68, "rgba(120, 120, 250, 0)");
            return gradient;
        },
        },
        {
            fill: true,
            tension: 0.75,
            label: ` - ${coinTwo} $`,
            data: updatedVolumesTwo,
            borderColor: "#D878FA",
            borderWidth: borderWidth,
            pointRadius: 0,
            backgroundColor: (context: any) => {
                const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "#D878FA");
                gradient.addColorStop(0.68, "rgba(216, 120, 250, 0)");
                return gradient;
            },
            },
    ],
    };
};