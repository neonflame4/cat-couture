<template>
  <div class="catHeader">
    <h1>
      <span>Cat Couture</span>
      <br><span class="subtitle">Fashionable. Fresh. Fabulously Feline.</span>
    </h1>
  </div>
</template>


<script>
  export default {
    name: 'CatsHeader',
    props: {
      msg: String,
    },
  };
</script>


<style scoped lang="scss">
  .subtitle {
    font-size: .8em;
  }
</style>
