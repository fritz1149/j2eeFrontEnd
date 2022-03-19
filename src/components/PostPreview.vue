<template>
  <div class="post-preview">
    <div class="preview-titlebox">
        <div class="preview-title">{{postTitle}}</div>
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
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #333;
  line-height: 22px;
  list-style: none;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 1px;
  margin-left: 70px;
}
.preview-titlebox{
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #333;
  line-height: 22px;
  list-style: none;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  zoom: 1;
}
.preview-title{
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #333;
  line-height: 22px;
  list-style: none;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  float: left!important;
  width: 420px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-sender{
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  line-height: 22px;
  list-style: none;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  float: right!important;
  width: 165px;
  color: #999;
}
.preview-body{
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #333;
  line-height: 22px;
  list-style: none;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  zoom: 1;
  padding-top: 3px;
  position: relative;
}

</style>
