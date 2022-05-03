<template>
<v-card>
  <v-list three-line>
    <template v-for="(r, index) in innerReplyData.data.list">
      <v-list-item
          :key="index"
      >
        <v-list-item-avatar>
          <v-img :src="OssUrl+r.sender.userAvatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="r.sender.userName"></v-list-item-title>
          <v-list-item-content v-html="r.content"></v-list-item-content>
          <v-list-item-subtitle right v-html="r.sendTime"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
  <v-pagination v-if="innerReplyData.data.pages!==1" v-model="pageNum" :length="innerReplyData.data.pages"></v-pagination>
</v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "InnerReplyWithPagination",
  props:{
    replyId:Number
  },
  data:function () {
    return {
      innerReplyData:null,
      pageNum:1,
      pageSize:5
    }
  },methods:{
    getInnerReplies () {
      axios.get('/api/inner/get',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          replyID:this.replyId
        }
      }).then((res)=>{
        this.innerReplyData=res.data
      })
    }
  },
  created() {
    this.getInnerReplies()
  }
}
</script>

<style scoped>

</style>
