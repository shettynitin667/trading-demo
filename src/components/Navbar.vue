<template>
  <div class="navbar">Trading Demo</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  height: 50px;
  color: white;
  font-size: 2rem;
  display: grid;
  place-items: center;
  z-index: 10;
  background: $burgundy;
  font-weight: 400;
}
</style>
