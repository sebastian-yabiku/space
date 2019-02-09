<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from "./presentation/pages/home";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
