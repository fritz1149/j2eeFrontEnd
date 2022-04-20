<template>
<v-card>
  <v-card-text>hello？</v-card-text>
  <v-list three-line>
    <template v-for="(r, index) in innerReplyData.list">
      <v-subheader
          v-if="item.header"
          :key="index"
          v-text="item.header"
      ></v-subheader>
      <v-list-item
          v-else
          :key="index"
      >
        <v-list-item-avatar>
          <v-img :src="r.sender.userAvatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="r.sender.userName"></v-list-item-title>
          <v-list-item-subtitle v-html="r.content"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
  <v-pagination v-model="pageNum" :length="innerReplyData.pages"></v-pagination>
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
          pageSize:this.pageSize
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
