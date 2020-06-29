<template>
  <div id="app">
    <div id="app_content">
      <CatsHeader/>
      <CatsGallery/>
    </div>
    <Modal/>
  </div>
</template>


<script>
  import CatsHeader         from './components/CatsHeader.vue';
  import CatsGallery        from './components/CatsGallery.vue';
  import Modal              from './components/Modal.vue';
  import { GalleryService } from './GalleryService';
  
  export default {
    name: 'App',
    components: {
      CatsHeader,
      CatsGallery,
      Modal,
    },
    
    data() {
      return {
        title: 'Cat Couture :: Fashionable. Fresh. Fabulously Feline.',
        galleryItems: {},
      };
    },
    
    mounted() {
      document.title = this.title;
      
      window.onresize = () => {
        GalleryService.$emit( 'windowResize' );
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
    background: #d1cbd9 url(assets/images/catbackground.jpg) repeat;
    font-size: 16px;
    color: $color-dark-purple;
  }
  
  #app {
    font-family: trade-gothic-next, sans-serif;
    font-weight: 400;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  
  #app_content {
    margin: 2rem auto;
    padding: $main-container-padding;
    width: 100%;
    max-width: rems($layout-width);
    background: #fff6f2;
    box-shadow: .5em .5em 1em rgba(#000, .5);
  }
  
  button {
    appearance: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    color: white;
    box-shadow: none;
    border: none;
    padding: .5rem 2rem;
    cursor: pointer;
    margin: 1rem;
    transition: background .2s ease-in-out;
    background: $color-dark-purple;
    
    &:hover {
      background: $color-light-purple;
      
    }
  }
</style>
