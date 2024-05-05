export type Coin = {
  id: string,
  coin: string,
  symbol: string,
  amount: number,
  purchaseTime: string,
  image: string,
  current_price: number,
  price_change_percentage_1h_in_currency: number,
  price_change_percentage_24h_in_currency: number,
  price_change_percentage_7d_in_currency: number,
  total_volume: number,
  market_cap: number,
  market_cap_rank: number,
  circulating_supply: number,
  total_supply: number,
  sparkline_in_7d: {
    price: number[]
  },
  name: string,
}
export type SortType = "rank" | "symbol" | "price" | "oneHour" | "twentyFourHour" | "sevenDay" | "volume" | "circulatingSupply";
export const sortNames: Record<SortType, string> = {
  rank: "market_cap_rank",
  symbol: "symbol",
  price: "current_price",
  oneHour: "price_change_percentage_1h_in_currency",
  twentyFourHour: "price_change_percentage_24h_in_currency",
  sevenDay: "price_change_percentage_7d_in_currency",
  volume: "total_volume",
  circulatingSupply: "circulating_supply"
};
export type HeaderProps = {
  handleSort: React.MouseEventHandler<HTMLDivElement>;
};
export type ParagraphProps = {
  name: SortType,
  text: string,
  style: string
}[];