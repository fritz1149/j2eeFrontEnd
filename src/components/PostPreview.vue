<template>
  <div>
    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <v-card-title @click="toPost" class="postPreviewTitle">
            <p>{{postTitle}}</p> &nbsp;&nbsp;&nbsp;
            <v-btn v-if="showSection" v-text="postSection.name"></v-btn>
          </v-card-title>
          <v-card-text v-text="postContent"/>
          <v-img v-if="postPicUrl!=='null'" :src="this.OssUrl+postPicUrl" max-height="300"
                 max-width="500"></v-img>

          <v-card-subtitle v-text="'最后回复于'+postLastRepliedTime"/>
        </v-list-item-content>
        <v-list-item-avatar rounded="rounded-circle" ><v-img :src="this.OssUrl+postSender.userAvatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
    <br/>
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
  methods: {
    toPost() {
      this.$router.push('/post/'+this.postId)
    }
  }
}
</script>

<style scoped>
.postPreviewTitle>p:hover{
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
</style>
