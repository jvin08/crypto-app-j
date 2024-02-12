// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiKey = "x_cg_demo_api_key=CG-M56s6xLEXVt96rZqLS77E2KE";
// Define a service using a base URL and expected endpoints
export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/"}),
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
        query: ({currency="usd", page=1}) => `coins/markets?vs_currency=${currency}&page=${page}&order=market_cap_desc&per_page=50&sparkline=true&price_change_percentage=1h%2C24h%2C7d&${apiKey}`
    }),
  }),
});
export const { 
    useGetMarketDataQuery, 
    useGetCoinsDataQuery, 
    useGetCoinsIntervalDataQuery,
    useGetTableCoinsDataQuery
} = marketApi;