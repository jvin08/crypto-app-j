import Coins from "./Coins"
import { useGetMarketDataQuery, useGetCoinsDataQuery } from "../../lib/marketSlice"
import Exchange from "./Exchange"
import Volume from "./Volume"
import Cap from "./Cap"
import FirstCoin from "./FirstCoin"
import SecondCoin from "./SecondCoin"

export const TopNavbar: React.FC = () => {
    const { data, error, isLoading } = useGetMarketDataQuery('')
    const { data: dataBTC, error: errorBTC, isLoading: isLoadingBTC } = useGetCoinsDataQuery('')
    const newData = data?.data
    const btcData = dataBTC?.[0]
// console.log(dataBTC);

    const market = {
        totalMarket: Number((btcData?.market_cap / (newData?.market_cap_percentage['btc'] / 100) / Math.pow(10,12)).toFixed(2)) ,
        coins: newData?.active_cryptocurrencies,
        exchange: newData?.markets,
        marketCap: Number((Math.floor(newData?.total_market_cap['btc']) / 1000000).toFixed(2)),
        marketVolume: Number((Math.floor(newData?.total_volume['btc']) / 1000000).toFixed(2)),
        marketPercentageFirst: Math.floor(newData?.market_cap_percentage['btc']),
        marketPercentageSecond: Math.floor(newData?.market_cap_percentage['eth']),
}

  return (
    <div className='bg-cryptoblue-900 flex justify-center text-xs text-cryptoblue-100 py-3'>
        <Coins quantity={market.coins}/>
        <Exchange quantity={market.exchange} />
        <Volume quantity={market.totalMarket} isLoading={isLoading} />
        <Cap quantity={market.marketCap} percentage={Math.floor(market.marketCap / market.totalMarket)}  isLoading={isLoading} />
        <FirstCoin quantity={market.marketPercentageFirst} isLoading={isLoading} />
        <SecondCoin quantity={market.marketPercentageSecond}  isLoading={isLoading} />
    </div>
  )
}

