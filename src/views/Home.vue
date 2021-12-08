<template>
  <div class="home">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomePage from "@/components/Home.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HomePage,
  },
});
</script>
