<template>
  <div class="container">
    <Navbar />
    <CoinsList />
    <LightWeight />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import LightWeight from "./LightWeight.vue";
import CoinsList from "./CoinsList.vue";

export default {
  name: "HomePage",
  components: {
    LightWeight,
    CoinsList,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  gap: 2rem;
  align-items: center;
}
</style>
