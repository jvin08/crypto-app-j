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
  [key: string]: any
}
export type SortType = "market_cap" | "id" | "price" | "oneHour" | "twentyFourHour" | "sevenDay" | "volume" | "circulatingSupply";
export const sortNames = {
  marketCap: "market_cap_rank",
  id: "id",
  price: "current_price",
  oneHour: "price_change_percentage_1h_in_currency",
  twentyFourHour: "price_change_percentage_24h_in_currency",
  sevenDay: "price_change_percentage_7d_in_currency",
  volume: "total_volume",
  circulatingSupply: "circulating_supply"
};
export type HeaderProps = {
  handleSort: React.MouseEventHandler<HTMLDivElement>;
  sort: string,
  order: string
};
export type ParagraphProps = {
  name: string,
  text: string,
  style: string
}[];
export type ParagraphProp = {
  name: string,
  text: string,
  style: string
};
export interface ColumnNameProps {
  props: ParagraphProp;
  sort: string;
  order: string;
  visible: string;
  opacity: string;
}
