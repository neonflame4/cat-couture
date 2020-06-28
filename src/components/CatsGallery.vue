<template>
  <div id="gallery_container">
    <div class="load-error" v-if="showGalleryError" v-cloak>There was a problem loading the gallery images ...</div>
    <Thumbnail
            v-for="(image, index) in galleryImages"
            :key="index"
            :imageData="image"
    />
    <!--            :url="image.url"-->
  </div>
</template>


<script>
  import Thumbnail          from './Thumbnail';
  import { GalleryService } from '../GalleryService';
  
  export default {
    name: 'CatsGallery',
    components: {
      Thumbnail,
    },
    
    data() {
      return {
        galleryImages: GalleryService.galleryImages,
        showGalleryError: false,
      };
    },
    
    mounted() {
      GalleryService.$on( 'galleryImagesUpdate', payload => {
        this.galleryImages = payload;
      } );
    },
  };
</script>


<style scoped lang="scss">
  :host {
    display: flex;
    flex-flow: row wrap;
  }
  
  .load-error {
    width: 100%;
    background: red;
    color: white;
    border-radius: 5px;
    font-size: 1.25rem;
    padding: .5rem;
  }
</style>
