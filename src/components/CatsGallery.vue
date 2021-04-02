<template>
  <div id="gallery_container">
    <div class="load-error" v-if="showGalleryError" v-cloak>There was a problem loading the gallery images ...</div>
    <div class="search_container">
      <input type="text" class="gallery_filter_search"
             v-model="searchText"
             placeholder="Search here ..."
             @keyup="checkForEmptyFilter"
             @keyup.enter="filterGalleryItems"
             @keyup.esc="resetFilter"
      >
      <button @click="filterGalleryItems" class="gallery_filter_button">Filter</button>
    </div>
    <div class="thumbnail_container">
      <template v-if="!galleryImages.length">
        <h2>Sorry, no mouse for you.</h2>
        <p>Looks like your search didn't come up with any results.</p>
      </template>
      <Thumbnail
          v-for="(image, index) in galleryImages"
          :key="index"
          :imageData="image"
      />
    </div>

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
      searchText: '',
    };
  },

  methods: {
    checkForEmptyFilter() {
      if (this.searchText === '') {
        GalleryService.resetGallery();
      }
    },

    resetFilter() {
      this.searchText = '';
      this.checkForEmptyFilter();
    },

    filterGalleryItems() {
      GalleryService.filterGalleryItems( this.searchText );
    },
  },

  mounted() {
    GalleryService.$on( 'galleryImagesUpdate', payload => {
      this.galleryImages = payload;
    } );
  },
};
</script>


<style scoped lang="scss">
@import "../assets/scss/global";

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

.gallery_filter_search {
  width: 20rem;
}

@include mobile-only {
  .gallery_filter_search {
    max-width: 75%;
  }
  .gallery_filter_button {
    max-width: 20%;
  }
}

</style>
