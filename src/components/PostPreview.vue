<template>
  <div class="post-preview">
    <div class="preview-titlebox">
      <div class="preview-title">
          <router-link to="/home">{{postTitle}}</router-link>
      </div>
      <div class="preview-sender">{{postSender.userName}}</div>
    </div>
    <div class="preview-body">
      <div class="content-holder">
        <div class="preview-text">{{postContent}}</div>
        <div class="preview-pic">
          <img :src="'https://huahuaxiaomuzhu.oss-cn-beijing.aliyuncs.com'+postPicUrl+'?x-oss-process=image/resize,w_200'">
        </div>
      </div>
      <div class="last-replied-time">
        {{postLastRepliedTime}}
      </div>
    </div>
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
    postSender:Object,
    postLastRepliedTime:String,
    postPicUrl:String
  }
}
</script>

<style scoped>
.post-preview{
  font-size: 14px;
  text-align: left;
  line-height: 150%;
  box-sizing: border-box;
  display: block;
  margin-top: 30px;
  padding: 20px;
  border: 0px solid #000;
  border-left: 6px solid #2196F3;
  background-color: #ddffff;

}
.preview-titlebox{
  float: top;
  position: relative;
}
.preview-title{
  float: left;
}
.preview-sender{
  float: right;
}
.preview-body{
  float: bottom;
  position: relative;
}

</style>
