<template>
  <div id="app">
    <CatsHeader/>
    <CatsGallery/>
  </div>
</template>


<script>
  import CatsHeader   from './components/CatsHeader.vue';
  import CatsGallery  from './components/CatsGallery.vue';
  import { EventBus } from './helper';
  
  export default {
    name: 'App',
    components: {
      CatsHeader,
      CatsGallery,
    },
    
    data() {
      return {
        title: 'Cat Couture :: Fashionable. Fresh. Fabulously Feline.',
      };
    },
    
    mounted() {
      document.title = this.title;
      
      window.onresize = () => {
        EventBus.$emit( 'windowResize' );
      };
    },
  };
</script>


<style lang="scss">
  @import "assets/scss/global";
  
  * {
    box-sizing: border-box;
  }
  
  body {
    background: #fff6f2 url(assets/images/catbackground.jpg) repeat;
    font-size: 16px;
  }
  
  a {
    color: #42b983;
  }
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 2rem auto;
    padding: $main-container-padding;
    width: 100%;
    max-width: rems($layout-width);
    background: #fff6f2;
  }
</style>
