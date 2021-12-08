<template>
  <div
    class="coinElement"
    :class="[symbol === coin.symbol ? 'colored' : '']"
    @click="changeCurrency"
    v-if="coin"
  >
    <img :src="coin.image" class="coinElement_image" alt="crypto" />
    <div class="coinData">
      <div class="coinData_name">{{ coin.symbol }}</div>

      <div :class="[coin.price_change > 0 ? 'profit' : 'loss']">
        <i :class="arrowDirection"></i> {{ coin.price_change }} %
      </div>
    </div>
    <div class="coinElement_price">{{ coin.price }} $</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CoinElement",
  props: {
    coin: Object,
  },
  data() {
    return {
      arrowDirection: "",
    };
  },

  mounted() {
    if (this.coin) {
      if (this.coin.price_change > 0) {
        this.arrowDirection = "fas fa-sort-up";
      } else {
        this.arrowDirection = "fas fa-sort-down";
      }
    }
  },

  methods: {
    ...mapActions(["changeSymbol"]),
    changeCurrency() {
      this.changeSymbol(this.coin);
    },
  },

  computed: {
    symbol() {
      return this.$store.state.symbol.toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.coinElement {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.6rem 1rem;
  transition: all 0.3s;
  border-bottom: 1px solid rgb(199, 199, 199);
  &_image {
    width: 35px;
  }

  .coinData {
    flex: 1;
    &_name {
      text-transform: uppercase;
      font-weight: bold;
    }

    .profit {
      color: green;
      font-weight: bold;
    }

    .loss {
      color: red;
      font-weight: bold;
    }
  }

  &_price {
    font-size: 0.9rem;
    font-weight: bold;
  }

  &:hover {
    background: rgb(216, 216, 216);
  }
}

.coinElement.colored {
  background: $burgundy;
  color: white;
}
</style>
