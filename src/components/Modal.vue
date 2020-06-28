<template>
  <div class="modal_wrapper_outer" v-if="!hidden">
    <div class="modal_wrapper_inner">
      <div class="modal_controls">
        <div class="btn close_modal" @click="close">
          <i class="fa fa-times"></i>
        </div>
      </div>
      
      <div class="gallery">
        <h3 class="imageTitle">{{ imageTitle }}</h3>
        <div class="imageLarge">
          <img :src="imageUrl" :alt="imageTitle">
        </div>
      </div>
      
      <div class="gallery_controls">
        <button class="prev" @click="prevGalleryItem">Previous</button>
        <button class="next" @click="nextGalleryItem">Next</button>
      </div>
    </div>
  </div>
</template>


<script>
  import { GalleryService } from '../GalleryService';
  
  export default {
    name: 'Modal',
    data() {
      return {
        hidden: true,
        imageTitle: '',
        imageUrl: '',
      };
    },
    
    methods: {
      open() {
        this.hidden = false;
      },
      
      close() {
        this.hidden = true;
      },
      
      nextGalleryItem() {
        GalleryService.getNextImage();
      },
      
      prevGalleryItem() {
        GalleryService.getPrevImage();
      },
    },
    
    mounted() {
      GalleryService.$on( 'openGalleryItem', function ( payload ) {
        this.open();
        
        this.imageTitle = payload.title;
        this.imageUrl   = payload.url;
      }.bind( this ) );
    },
  };
</script>


<style scoped lang="scss">
  @import "../assets/scss/global";
  
  :host {
    font-size: 1rem;
  }
  
  .modal_wrapper_inner {
    display: block;
    position: relative;
    background: white;
    border-radius: 5px;
    margin: 2rem auto;
    padding: 2rem;
    width: rems(900px);
    max-width: 100%;
    min-height: rems(200px);
  }
  
  .modal_wrapper_outer {
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-x: hidden;
    overflow-y: scroll;
    left: 0;
    top: 0;
    background: rgba(#000, .8);
  }
  
  .btn.close_modal {
    position: absolute;
    right: .5rem;
    top: .5rem;
    font-size: 2rem;
    cursor: pointer;
    
    &:hover {
      color: red;
    }
  }
  
  .imageLarge {
    > img {
      max-width: 100%;
      max-height: 80vh;
      
      @include mobile-only {
        max-height: 70vh;
      }
    }
    
  }
  
  @include mobile-only {
    .gallery_controls {
      display: flex;
      
      button {
        padding: .5rem;
        width: 50%;
        margin: .5rem;
      }
    }
  }

</style>
