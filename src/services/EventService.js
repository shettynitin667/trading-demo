import axios from "axios";

const apiUrl = (symbol, limit = 1) => {
  symbol += "USDT";
  return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&limit=${limit}`;
};

const coinsDataUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false";

export async function getPreviousData(symbol) {
  try {
    const { data } = await axios.get(apiUrl(symbol, 500));
    return parsedData(data);
  } catch (e) {
    console.log(e);
  }
}

export function parsedData(data) {
  const chartData = data.map((e) => {
    return {
      time: e[0] / 1000,
      open: parseFloat(e[1]),
      high: parseFloat(e[2]),
      low: parseFloat(e[3]),
      close: parseFloat(e[4]),
    };
  });
  return chartData;
}

export async function getAllCoins() {
  try {
    const { data } = await axios.get(coinsDataUrl);
    return parseCoinsArray(data);
  } catch (e) {
    console.log(e);
  }
}

export function parseCoinsArray(arr) {
  let dollarIndianLocale = Intl.NumberFormat("en-IN");

  return arr.map((e) => {
    if (e.symbol === "usdt") return null;
    return {
      name: e.name,
      image: e.image,
      price: dollarIndianLocale.format(e.current_price),
      symbol: e.symbol.toLowerCase(),
      price_change: parseFloat(e.price_change_percentage_24h).toFixed(2),
    };
  });
}
