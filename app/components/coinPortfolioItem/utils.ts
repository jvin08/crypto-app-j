import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const timeInterval = (purchaseDate: string) => {
  const date = new Date(purchaseDate).getTime();
  const today = new Date().getTime();
  const diff = today - date;
  if(diff < 86400) return 1;
  if(diff > 86400) return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};
export const calculatePrice = (prices: number[][], purchaseDate: string) => {
  const milliseconds = new Date(purchaseDate).getTime();
  let closestTime = prices?.[0]?.[0];
  let closestPrice = prices?.[0]?.[1];
  let minDiff = Math.abs(milliseconds - closestTime);
  for (let i = 1; i < prices?.length; i++) {
    const diff = Math.abs(milliseconds - prices?.[i][0]);
    if (diff < minDiff) {
      minDiff = diff;
      closestTime = prices?.[i][0];
      closestPrice = prices?.[i][1];
    }
  }
  return closestPrice;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatTime = (time: string) => {
  return time.slice(5,7) + "." + time.slice(8,10) + "." + time.slice(0,4);
};