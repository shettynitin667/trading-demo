<template>
  <div class="chartName">
    <div>
      <span>{{ $store.state.symbol }}/USDT</span>
      <span class="coin_name">{{ $store.state.currencyName }}</span>
    </div>

    <div class="chartContainer" ref="chartContainer"></div>
  </div>
</template>

<script>
import { getPreviousData } from "@/services/EventService";
import { createChart } from "lightweight-charts";
import { mapGetters } from "vuex";
import dayjs from "dayjs";

export default {
  name: "LightWeight",

  data() {
    return {
      // symbol: "",
      candleSeries: null,
      url: "wss://stream.binance.com:9443/ws",
      socketConnection: null,
      chartOptions: {
        width: 1000,
        height: 500,
        title: "Light charts",
        layout: {
          fontFamily: "Lato, sans-serif",
        },
        grid: {
          vertLines: {
            color: "rgba(42, 46, 57, 0)",
          },
          horzLines: {
            color: "rgba(42, 46, 57, 0.3)",
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      },
      timeStamp: "",
      newData: null,
    };
  },

  mounted() {
    // this.symbol = this.$store.state.symbol;
    const chart = createChart(this.$refs.chartContainer, this.chartOptions);
    this.candleSeries = chart.addCandlestickSeries();
    this.renderPreviousData();
  },

  watch: {
    symbol() {
      this.socketConnection.close();
      this.renderPreviousData();
    },

    timeStamp() {
      this.candleSeries.update(this.newData);
    },
  },

  computed: {
    ...mapGetters({
      symbol: "getCurrentSymbol",
    }),
  },
  methods: {
    async renderPreviousData() {
      const chartData = await getPreviousData(this.symbol);
      this.candleSeries.setData(chartData);
      this.renderNewData();
    },

    //For rendering realtime data
    async renderNewData() {
      this.socketConnection = new WebSocket(this.url);
      const symbol = this.symbol + "usdt";
      this.socketConnection.onopen = function (socket) {
        this.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: [`${symbol.toLowerCase()}@kline_1h`],
            id: 1,
          })
        );
      };

      this.socketConnection.onmessage = (e) => {
        this.newData = this.parseCandleData(e.data);
        this.timeStamp = dayjs.unix(this.newData.time).format("mm");
      };
    },

    //Parse data in format
    parseCandleData(data) {
      const parsedData = JSON.parse(data);

      if (parsedData.k) {
        let {
          E: time,
          k: { o: open, h: high, l: low, c: close },
        } = parsedData;
        time = parseFloat(time) / 1000;
        open = parseFloat(open);
        high = parseFloat(high);
        low = parseFloat(low);
        close = parseFloat(close);
        return { time, open, high, low, close };
      }
      return { time: new Date() };
    },
  },
};
</script>

<style lang="scss" scoped>
.chartName {
  // color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;

  .coin_name {
    font-size: 1.1rem;
    padding-left: 10px;
    color: rgb(95, 95, 95);
  }

  .chartContainer {
    overflow-y: scroll;
    align-self: flex-start;
    // padding-top: 60px;
  }
}
</style>
