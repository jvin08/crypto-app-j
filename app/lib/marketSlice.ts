// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, BaseQueryFn, BaseQueryApi } from "@reduxjs/toolkit/query/react";

const baseQueryCoinGecko = fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" });
const baseQueryAlternative = fetchBaseQuery({ baseUrl: "https://api.alternative.me/" });
const customBaseQuery:BaseQueryFn = async (args: string, api: BaseQueryApi, extraOptions: any) => {
  if(typeof args === "string" && args.includes("fng")) {
    return baseQueryAlternative(args, api, extraOptions);
  }else{
    return baseQueryCoinGecko(args, api, extraOptions);
  }
};
const apiKey = `x_cg_demo_api_key=${process.env.NEXT_PUBLIC_x_cg_demo_api_key}`;
// Define a service using a base URL and expected endpoints
export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: customBaseQuery, //fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/"}),
  endpoints: (builder) => ({
    getMarketData: builder.query({
      query: () => "global",
    }),
    getCoinsData: builder.query({
      query: (query) => `coins/markets?vs_currency=${query}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&${apiKey}`
    }),
    getCoinsIntervalData: builder.query({
      query: (query) => `coins/${query}&${apiKey}`
    }),
    getTableCoinsData: builder.query({
      query: ({currency="usd", query}) => `coins/markets?vs_currency=${currency}&${query}&per_page=50&sparkline=true&price_change_percentage=1h%2C24h%2C7d&${apiKey}`
    }),
    getSearchCoinsData: builder.query({
      query: (query) => `search?query=${query}&${apiKey}`
    }),
    getTenCoinsPrices: builder.query({
      query: (query, currency="usd") => `simple/price?ids=${query}&include_24hr_change=true&vs_currencies=${currency}&${apiKey}`
    }),
    getOneCoinData: builder.query({
      query: (query) => `coins/${query}?${apiKey}`
    }),
    getCoinDataByDate: builder.query({
      query: (query) => `coins/${query}&${apiKey}`
    }),
    getFearAndGreedData: builder.query({
      query: () => "fng/",
    }),
  }),
});
export const { 
  useGetMarketDataQuery, 
  useGetCoinsDataQuery, 
  useGetCoinsIntervalDataQuery,
  useGetTableCoinsDataQuery,
  useGetSearchCoinsDataQuery,
  useGetTenCoinsPricesQuery,
  useGetOneCoinDataQuery,
  useGetCoinDataByDateQuery,
  useGetFearAndGreedDataQuery,
} = marketApi;