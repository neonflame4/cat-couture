import Vue   from 'vue';
import axios from 'axios';

export const GalleryService = new Vue( {
  data() {
    return {
      galleryImages: [],
      currentIndex: 0,
    };
  },
  
  methods: {
    openGalleryItem( galleryItem ) {
      this.currentIndex = galleryItem.indexNum;
      this.$emit( 'openGalleryItem', galleryItem );
    },
    
    getPrevImage() {
      let prevGalleryItem = this.currentIndex - 1;
      if (prevGalleryItem <= -1) {
        prevGalleryItem = this.galleryImages.length - 1;
      }
      
      this.openGalleryItem( this.galleryImages[ prevGalleryItem ] );
    },
    
    getNextImage() {
      let nextGalleryItem = this.currentIndex + 1;
      if (nextGalleryItem >= this.galleryImages.length) {
        nextGalleryItem = 0;
      }
      
      this.openGalleryItem( this.galleryImages[ nextGalleryItem ] );
    },
    
    filterGalleryItems( searchCriterea ) {
      if (searchCriterea === '') {
        this.resetGallery();
        return;
      }
      
      let filteredGalleryItems = this.galleryImages.filter( item => {
        return item.title.toLowerCase().includes( searchCriterea.toLowerCase() );
      } );
      
      this.$emit( 'galleryImagesUpdate', filteredGalleryItems );
    },
    
    resetGallery() {
      this.$emit( 'galleryImagesUpdate', this.galleryImages );
    },
  },
  
  created() {
    axios.get( '/gallery_images.json' )
         .then( response => {
           response.data.forEach( ( data, index ) => {
             data.indexNum = index;
           } );
      
           this.$set( this, 'galleryImages', response.data );
           this.$emit( 'galleryImagesUpdate', this.galleryImages );
         } )
         .catch( () => {
           this.showGalleryError = true;
         } );
  },
} );
