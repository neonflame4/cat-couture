<template>
  <div class="catHeader">
    <h1>
      <span class="header_cat">Cat</span><span class="header_couture">Couture</span>
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
  @import "../assets/scss/global";
  
  h1 {
    font-family: "Arial";
    text-transform: uppercase;
    
    .header_couture {
      font-family: "Arial Black";
    }
  }
  
  .subtitle {
    font-family: "Arial Narrow";
    font-size: .8em;
    color: $color-light-purple;
  }
</style>
