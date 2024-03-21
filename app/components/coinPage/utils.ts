export const addCommas = (num: number) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const isPositive = (number:number) => {
  return number > 0 ? true : false;
};