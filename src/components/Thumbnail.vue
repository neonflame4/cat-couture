<template>
  <div class="thumbnail-wrapper" @click="openGalleryItem">
    <img class="thumbnail" :src="imageData.url" ref="thumbnail"/>
  </div>
</template>


<script>
/* eslint-disable */
import { px }             from '../helper';
import { GalleryService } from '../GalleryService';

export default {
  name: 'Thumbnail',
  props: {
    imageData: Object,
  },

  data() {
    return {
      thumbnail: '',
      wrapper: '',
      thumbnailRatio: 1,
      origWidth: px( 0 ),
      origHeight: px( 0 ),
    };
  },

  methods: {
    scaleThumbnailImages() {
      this._resetThumbnailDimensions();
      this._fitThumbnailToWrapper();
      this._centerThumbnailInWrapper();
    },

    _resetThumbnailDimensions() {
      this.thumbnail.style.width  = '';
      this.thumbnail.style.height = '';
      this.thumbnailRatio         = this.thumbnail.width / this.thumbnail.height;
    },

    _fitThumbnailToWrapper() {
      this.thumbnail.style.height = px( this.wrapper.offsetHeight );
      this.thumbnail.style.width  = px( this.thumbnailRatio * this.thumbnail.offsetHeight );

      if (this.wrapper.offsetWidth > this.thumbnail.offsetWidth) {
        this.thumbnail.style.width  = px( this.wrapper.offsetWidth );
        this.thumbnail.style.height = px( this.thumbnail.offsetWidth / this.thumbnailRatio );
      }
    },

    _centerThumbnailInWrapper() {
      this.thumbnail.style.top  = px( -( this.thumbnail.offsetHeight - this.wrapper.offsetHeight ) / 2 );
      this.thumbnail.style.left = px( -( this.thumbnail.offsetWidth - this.wrapper.offsetWidth ) / 2 );
    },

    openGalleryItem() {
      GalleryService.openGalleryItem( this.imageData );
    },
  },

  mounted() {
    this.thumbnail = this.$refs.thumbnail;
    this.wrapper   = this.thumbnail.parentElement;

    this.thumbnail.onload = () => {
      this.origWidth  = this.thumbnail.offsetWidth;
      this.origHeight = this.thumbnail.offsetHeight;

      this.scaleThumbnailImages();
    };

    /* Whenever window gets resized, re-fit thumbnails to wrapper */
    GalleryService.$on( 'windowResize', () => {
      this.scaleThumbnailImages();
    } );
  },

  updated() {
    this.scaleThumbnailImages();
  },
};
</script>


<style scoped lang="scss">
@import "../assets/scss/global";

.thumbnail-wrapper {
  @include thumbnail-size(4);

  display: inline-block;
  position: relative;
  overflow: hidden;
  margin: $thumbnail-margin;
  background-color: $color-dark-purple;
  max-width: calc(100% - #{2 * $thumbnail-margin});
  cursor: pointer;
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: $color-light-purple;

    > .thumbnail {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  > .thumbnail {
    position: absolute;
    left: 0;
    top: 0;
    height: auto;
    width: auto;
    opacity: .8;
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
  }
}
</style>
