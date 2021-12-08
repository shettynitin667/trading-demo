import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGoogleCharts from "vue-google-charts";
import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

createApp(App)
  .use(VueGoogleCharts)
  .use(store)
  .use(VueFusionCharts, FusionCharts, TimeSeries)
  .use(router)
  .mount("#app");
