<template>
  <div class="parent">
    <div class="div1"><p>{{postLastRepliedTime}}</p> </div>
    <div class="div2"><p>{{postSender.userName}}</p> </div>
    <div class="div3"><p>{{postRepliedCount}}</p> </div>

    <div class="div4"><p>{{postTitle}}</p> </div>
    <div class="div5">
    <p>{{postContent}}</p>
      <img :src="this.OssUrl+postPicUrl+'?x-oss-process=image/resize,w_200'">
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
    postPicUrl:String,
    postRepliedCount:Number
  }
}
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 { grid-area: 2 / 19 / 3 / 21; }
.div2 { grid-area: 1 / 19 / 2 / 21; }
.div3 { grid-area: 1 / 1 / 2 / 3; }
.div4 { grid-area: 1 / 3 / 2 / 13; }
.div5 { grid-area: 2 / 3 / 5 / 18; }

</style>
