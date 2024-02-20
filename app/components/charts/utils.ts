export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export function oneDayFormat(date: Date) {
  const hours = String(date.getUTCHours()).padStart(2, "0"); // Get hours and pad with leading zero if needed
  const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Get minutes and pad with leading zero if needed
  return `${hours}:${minutes}`;
}
export function formatStandardDate(date: Date) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short" }).format(date);
}
export function fiveYearFormat(date: Date) {
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
  }
  export const getPriceFooterData = (data: number[][], index: number) => Number(data?.[index] || data?.slice(-1)[0]).toFixed(3);
  export const getVolumeFooterData = (data: number[][], index: number) => (Number(data?.[index]?.[1] || data?.slice(-1)[0][1]) / Math.pow(10,9)).toFixed(3);
  export const adjustedDataSet = (dataOne: number[][], dataTwo: number[][]) => {
    const max = dataTwo.length ? Math.max(dataOne?.length, dataTwo?.length) : dataOne?.length;
    const dataOneUpdated = Array(max-dataOne?.length).fill([null,null]).concat(dataOne);
    const dataTwoUpdated = Array(max-dataTwo?.length).fill([null,null]).concat(dataTwo);
    for (let i = 0; i < max; i++) {
      if (dataOneUpdated[i][0] === null) {
        dataOneUpdated[i][0] = dataTwoUpdated[i][0];
        dataOneUpdated[i][1] = 0;
      }
      if (dataTwoUpdated[i][0] === null) {
        dataTwoUpdated[i][0] = dataOneUpdated[i][0];
        dataTwoUpdated[i][1] = 0;
      }
    }
    return { dataOne: dataOneUpdated, dataTwo: dataTwoUpdated };
  };