<template>
  <v-list-item @click="fullImage = !fullImage">
    <img v-if="imgUrl" :src="imageSize" alt="我的图图呢">
  </v-list-item>
</template>

<script>
export default {
  name: "PicturePreview",
  props: ["imgUrl"],
  data: function (){
    return{
      fullImage: false,
    }
  },
  computed:{
    imageSize() {
        return this.fullImage ? this.OssUrl + this.imgUrl + '?x-oss-process=image/resize,m_fixed,w_500' :
            this.OssUrl + this.imgUrl + '?x-oss-process=image/resize,m_fixed,w_100';
    }
  }
}
</script>

<style scoped>

</style>