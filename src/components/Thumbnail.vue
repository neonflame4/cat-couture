<template>
  <div class="thumbnail-wrapper">
    <img class="thumbnail" :src="url" ref="thumbnail"/>
  </div>
</template>


<script>
  /* eslint-disable */
  import { EventBus, px } from '../helper';
  
  export default {
    name: 'Thumbnail',
    props: {
      url: String,
    },
    
    data() {
      return {
        indexNum: '',
        thumbnail: '',
        wrapper: '',
        origWidth: px( 0 ),
        origHeight: px( 0 ),
      };
    },
    
    methods: {
      scaleThumbnailImages() {
        
        const thumbnail      = this.thumbnail,
              wrapper        = this.wrapper,
              thumbnailRatio = thumbnail.width / thumbnail.height,
              isLandscape    = thumbnailRatio > 1,
              isPortrait     = !isLandscape
        ;
        
        if (isLandscape && wrapper.offsetHeight < this.origHeight) {
          thumbnail.style.height = px( wrapper.offsetHeight );
          thumbnail.style.width  = px( thumbnailRatio * thumbnail.offsetHeight );
          /* set height to 100% */
          console.log( 'COND1' );
        }
        else if (isLandscape && wrapper.offsetHeight >= this.origHeight) {
          thumbnail.style.width  = px( wrapper.offsetWidth );
          thumbnail.style.height = px( thumbnailRatio / thumbnail.offsetWidth );
          console.log( 'COND2' );
        }
        else if (isPortrait && wrapper.offsetWidth < this.origWidth) {
          thumbnail.style.width  = px( wrapper.offsetWidth );
          thumbnail.style.height = px( thumbnail.offsetWidth / thumbnailRatio );
          /* set height to 100% */
          console.log( 'COND3' );
        }
        else if (isPortrait && wrapper.offsetWidth >= thumbnail.width) {
          thumbnail.style.width  = px( wrapper.offsetWidth );
          thumbnail.style.height = px( thumbnail.offsetWidth / thumbnailRatio );
          console.log( 'COND4' );
        }
        
        else {
          console.log( 'ELSE' );
        }
        
        // this._logDetais();
        /* Adjust Positioning in Thumbnail Wrapper */
        thumbnail.style.top  = px( -( thumbnail.offsetHeight - wrapper.offsetHeight ) / 2 );
        thumbnail.style.left = px( -( thumbnail.offsetWidth - wrapper.offsetWidth ) / 2 );
      },
      
      _logDetais() {
        console.log( 'THUMBNAILS:' );
        console.log( this.thumbnail.style.width, this.thumbnail.style.height );
        
        console.log( 'WRAPPERS:' );
        console.log( this.wrapper.offsetWidth, this.wrapper.offsetHeight );
      },
      
    },
    
    mounted() {
      this.indexNum  = this.$vnode.key;
      this.thumbnail = this.$refs.thumbnail;
      this.wrapper   = this.thumbnail.parentElement;
      
      this.thumbnail.onload = () => {
        this.origWidth  = this.thumbnail.offsetWidth;
        this.origHeight = this.thumbnail.offsetHeight;
        
        this.scaleThumbnailImages();
      };
      
      EventBus.$on( 'windowResize', () => {
        this.scaleThumbnailImages();
      } );
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
      opacity: .6;
      transition: transform .2s ease-in-out, opacity .2s ease-in-out;
    }
  }
</style>
