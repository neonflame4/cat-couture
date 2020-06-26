<template>
  <div id="gallery_container">
    <Thumbnail
            v-for="i in 12"
            :key="i"
            :url="require('@/assets/images/gallery/' + (''+i).padStart(4, '0') + '.jpg')"/>
  </div>
</template>


<script>
  import Thumbnail from './Thumbnail';
  
  export default {
    name: 'CatsGallery',
    components: {
      Thumbnail,
    },
  };
</script>


<style scoped lang="scss">
  :host {
    display: flex;
    flex-flow: row wrap;
  }
</style>
