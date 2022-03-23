<template>
  <div>
    <v-card>
      <v-card-title @click="toPost">{{postTitle}} &nbsp;&nbsp;&nbsp; <v-btn v-if="showSection" v-text="postSection.name"></v-btn> </v-card-title>
      <v-card-text v-text="postContent"/>
      <v-img v-if="postPicUrl!=='null'" :src="this.OssUrl+postPicUrl" max-height="300"
             max-width="500"></v-img>

      <v-card-subtitle v-text="'最后回复于'+postLastRepliedTime"/>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  props:{
    postId:Number,
    postTitle:String,
    postContent:String,
    postSendDate:String,
    showSection:Boolean,
    postSender:Object,
    postSection:Object,
    postLastRepliedTime:String,
    postPicUrl:String,
    postRepliedCount:Number
  },
  methods:{
    toPost(){
      let vm = this
      this.$router.push({
        name: 'post',
        params: {
          post: vm.$props
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
