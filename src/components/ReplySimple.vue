<template>
  <v-card style="margin-bottom: 30px">
    <v-row>
      <v-col cols="2">
        <div class="PostPreviewAvatar">
          <v-avatar style="margin-bottom: 20px" size="80" rounded="rounded-circle" ><v-img :src="this.OssUrl+replySender.userAvatar"></v-img>
          </v-avatar>
          {{ replySender.userName }}
        </div>
      </v-col>
      <v-col cols="10">
        <v-card-title >
          <p @click="toPost" class="postPreviewTitle">查看原帖</p>
        </v-card-title>
        <v-card-text class="postPreviewContent" v-text="replyContent"/>
        <PicturePreview v-if="replyPicUrl!==undefined" :img-url="replyPicUrl"></PicturePreview>
        <v-card-subtitle class="postPreviewTime" v-text="'回复于'+replySendDate"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import PicturePreview from "@/components/PicturePreview";
export default {
  components:{
    PicturePreview
  },
  props:{
    replyId:Number,
    replyContent:String,
    replySendDate:String,
    replySender:Object,
    replyPicUrl:String,
    postId:Number,
  },
  name: "ReplySimple",
  methods:{
    toPost() {
      this.$router.push('/post/'+this.postId)
    },
  }
}
</script>

<style scoped>
.postPreviewTitle {
  display: inline-block;
  position: relative;
  color: hsl(222, 25%, 14%);
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
}

.postPreviewTitle::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 3px;
  bottom: 0;
  left: 0;
  background-color: hsl(243, 80%, 62%);
  transform-origin: bottom right;
  transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
}

.postPreviewTitle:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.postPreviewContent{
  font-size: 1rem;
}
.postPreviewTime{
  color: #535353;
}
.PostPreview:hover{
  transform: translateY(-5px);
  transition: transform .5s , all 0.5s;
  box-shadow:
      0 0.9px 13.4px -1px rgba(0, 0, 0, 0.04),
      0 3px 21.7px -1px rgba(0, 0, 0, 0.045),
      0 6.1px 28.9px -1px rgba(0, 0, 0, 0.049),
      0 10.5px 37.1px -1px rgba(0, 0, 0, 0.055),
      0 16.9px 49.1px -1px rgba(0, 0, 0, 0.069),
      0 31px 80px -1px rgba(0, 0, 0, 0.14);
}
.PostPreviewAvatar{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>