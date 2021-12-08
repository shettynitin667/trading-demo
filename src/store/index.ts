import { createStore } from "vuex";

export default createStore({
  state: {
    symbol: "BTC",
    currencyName: "Bitcoin",
  },
  mutations: {
    SET_SYMBOL: (state: any, symbol) => {
      state.symbol = symbol;
    },

    SET_CURRENCY_NAME: (state: any, name) => {
      state.currencyName = name;
    },
  },
  actions: {
    changeSymbol({ commit }, coin) {
      const symbol = coin.symbol.toUpperCase();
      commit("SET_SYMBOL", symbol);
      commit("SET_CURRENCY_NAME", coin.name);
    },
  },
  modules: {},
  getters: {
    getCurrentSymbol: (state) => {
      return state.symbol;
    },
  },
});
