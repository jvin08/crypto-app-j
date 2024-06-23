export const timeInterval = (purchaseDate: string) => {
  const date = new Date(purchaseDate).getTime();
  const today = new Date().getTime();
  const diff = today - date;
  if(diff < 86400) return 1;
  if(diff > 86400) return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};
export const amountInvested = (initialAmount:number, coinPrices:number[][], growRate: number) => {
  let spentAmount = Number(initialAmount);
  const actualGrowArray = [Number(initialAmount)] as number[];
  const growArray = [Number(initialAmount)] as number[];
  for(let i=1; i < coinPrices?.length; i++){
    const plannedNewValue = growArray[i-1] * (Number(growRate) / 100 + 1);
    const actualRate = coinPrices[i][1] / coinPrices[i-1][1];
    const newValue = growArray[i-1] * actualRate;
    spentAmount += plannedNewValue - newValue;
    growArray.push(plannedNewValue);
    actualGrowArray.push(newValue);
  }
  const growArrayWithTime = actualGrowArray.map((item, index) => [item, coinPrices?.[index][0]]);
  return {
    spentAmount: Math.floor(spentAmount), 
    lastValue: Math.floor(actualGrowArray.slice(-1)?.[0]), 
    investValuePerPeriod: growArrayWithTime
  };
};
export const amountInvestedDCA = (initialAmount:number, coinPrices:number[][], growAmount: number) => {
  let spentAmount = Number(initialAmount);
  const growArray = [Number(initialAmount)] as number[];
  for(let i=1; i < coinPrices?.length; i++){
    const actualGrow = coinPrices[i][1] / coinPrices[i-1][1];
    const newValue = growArray[i-1] * actualGrow + Number(growAmount);
    spentAmount += Number(growAmount);
    growArray.push(newValue);
  }
  const growArrayWithTime = growArray.map((item, index) => [item, coinPrices?.[index]?.[0]]);
  return {
    spentAmount: Math.floor(spentAmount), 
    lastValue: Math.floor(growArray.slice(-1)[0]), 
    investValuePerPeriod: growArrayWithTime
  };
};
export const filterPrices = (
  data: any, 
  days: number | undefined, 
  interval: number, 
  startTime: string, 
  endTime: string
) =>{
  const time = new Date(startTime).getTime();
  const endTimeStamp = endTime ? new Date(endTime).getTime() : new Date().getTime();
  const slicedData = sliceFromClosestTime(data?.prices, time, endTimeStamp);
  const coinPrices = slicedData?.filter((item:number[], index:number) => {
    const adjustedInterval = Number(days) < 91 ? Math.floor(interval * 24) : interval;
    if(index % Number(adjustedInterval) === 0){
      return item;
    }
  });
  return coinPrices;
};
function findClosestTime(arr: number[][], targetTime: number) {
  let minDiff = Infinity;
  let closestIndex = -1;
  for (let i = 0; i < arr?.length; i++) {
    const diff = Math.abs(arr[i][0] - targetTime);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
}
export function sliceFromClosestTime(arr: number[][], targetTime: number, endTime: number) {
  const closestIndex = findClosestTime(arr, targetTime);
  const endTimeClosestIndex = findClosestTime(arr, endTime);
  return arr?.slice(closestIndex, endTimeClosestIndex + 1);
}
export const info = {
  startDate: "Start date and time of investments.",
  endDate: "End date and time of investments.",
  initial: "The amount of money you invest at the beginning of the period.",
  groWRate: "The rate at which your investment grows, during one interval. If market growth more than this rate, you will add less money to your investment.",
  interval: "The number of days between each investment.",
  total: "The total amount of money you've spent on investments. Negative value means that you returned your investment completely, and have received returns above it.",
  value: "The value of all your coins at the end of the investments period.",
  amountPerInterval: "The amount of money added at the end of each interval.",
};
export const formattedDateTime = (date: Date) => {
  const currentDate = date;
  const offset = currentDate.getTimezoneOffset();
  const localDate = new Date(currentDate.getTime() - (offset * 60000));
  return localDate.toISOString().slice(0, 16);
};
export function formatStandardDate(date: Date) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "2-digit" }).format(date);
}
