<template>
  <div class="coinsList">
    <!-- <div class="list_title">Coins</div> -->
    <CoinElement v-for="(coin, index) in coinsData" :key="index" :coin="coin" />
  </div>
</template>

<script>
import { getAllCoins } from "@/services/EventService";
import CoinElement from "./CoinElement.vue";

export default {
  data() {
    return {
      coinsData: [],
    };
  },
  components: {
    CoinElement,
  },

  mounted() {
    this.getCoinsData();
    setInterval(this.getCoinsData, 4000);
  },

  methods: {
    async getCoinsData() {
      this.coinsData = await getAllCoins();
    },
  },
};
</script>

<style lang="scss" scoped>
.coinsList {
  height: 100%;
  flex: 0.7;
  padding: 2rem 0;
  border-right: 2px solid rgb(185, 185, 185);
  box-sizing: border-box;
  padding-top: 55px;
  overflow-y: scroll;
  .list_title {
    font-size: 2rem;
    color: white;
  }
}
</style>
