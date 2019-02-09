<template>
  <div class="home">
    <div class="map" id="map"></div>
  </div>
</template>

<script src="../../../controllers/pages/home">
</script>
<style lang="scss">
.home {
  .map {
    height: 100vh;
  }

  .popup {
    font-size: 12px;
    color: #717171;

    &__data {
      font-size: 16px;
    }

    &__lote {
      font-size: 14px;
    }

    &__detail {
      border-top: 1px solid #717171;
      padding: 10px 0 0;
      margin: 10px 0 0;

      span {
        display: inline-block;
        margin: 0 4px 0 0;
        color: #adadad;
      }
    }
  }
}
</style>
