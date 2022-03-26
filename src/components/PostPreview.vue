<template>
  <div class="PostPreview" style="margin-bottom: 30px">
    <v-card>
      <v-row>
        <v-col lg="2" md="2">
          <div class="PostPreviewAvatar">
            <v-avatar style="margin-bottom: 20px" size="80" rounded="rounded-circle" ><v-img :src="this.OssUrl+postSender.userAvatar"></v-img>
            </v-avatar>
            <v-btn v-if="showSection" @click="toSection" v-text="postSection.name" color="secondary"></v-btn>
          </div>
        </v-col>
        <v-col lg="9" md="9">
          <v-card-title >
            <p @click="toPost" class="postPreviewTitle">{{postTitle}}</p>
          </v-card-title>
          <v-card-text class="postPreviewContent" v-text="postContent"/>
          <v-img v-if="postPicUrl!==undefined" :src="this.OssUrl+postPicUrl" max-height="300"
          max-width="500"></v-img>
          <v-card-subtitle class="postPreviewTime" v-text="'最后回复于'+postLastRepliedTime"/>
        </v-col>
      </v-row>
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
  methods: {
    toPost() {
      this.$router.push('/post/'+this.postId)
    },
    toSection(){
      this.$router.push('/section/'+this.postSection.sectionId)
    }
  }
}
</script>

<style scoped>
/*.postPreviewTitle>p:hover{*/
/*  text-decoration: underline;*/
/*  color: blue;*/
/*  cursor: pointer;*/
/*}*/
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

.PostPreviewAvatar{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
</style>
