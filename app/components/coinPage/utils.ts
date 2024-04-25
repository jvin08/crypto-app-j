export const addCommas = (num: number) => {
  return num > 10 ? num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num;
};
export const isPositive = (number:number) => {
  return number > 0 ? true : false;
};