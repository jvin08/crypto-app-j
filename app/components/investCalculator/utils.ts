export const timeInterval = (purchaseDate: string) => {
  const date = new Date(purchaseDate).getTime();
  const today = new Date().getTime();
  const diff = today - date;
  if(diff < 86400) return 1;
  if(diff > 86400) return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};
export const amountInvested = (initialAmount:number, coinPrices:number[], growRate: number) => {
  let spentAmount = Number(initialAmount);
  const actualGrowArray = [Number(initialAmount)] as number[];
  const growArray = [Number(initialAmount)] as number[];
  for(let i=1;i<coinPrices?.length;i++){
    const plannedNewValue = growArray[i-1] * (Number(growRate) / 100 + 1);
    const actualRate = coinPrices[i] / coinPrices[i-1];
    const newValue = growArray[i-1] * actualRate;
    spentAmount += plannedNewValue - newValue;
    growArray.push(plannedNewValue);
    actualGrowArray.push(newValue);
  }
  return [Math.floor(spentAmount), Math.floor(actualGrowArray.slice(-1)?.[0])];
};