<template>
  <v-container v-if="this.replyData">
    <v-row>
      <v-col cols="10" offset="1" >
        <ReplySimple v-for="(p,i) in this.replyData.list" :key="i"
                      :reply-content="p.content" :reply-pic-url="p.imgUrl" :reply-send-date="p.sendTime"
                      :reply-sender="p.sender" :reply-id="p.replyId"/>
      </v-col>
    </v-row>
    <v-pagination v-model="pageNum" :length="replyData.pages" v-on:input="getMyReply" v-on:next="nextPage" v-on:previous="prevPage">
    </v-pagination>
  </v-container>
</template>

<script>
import ReplySimple from "@/components/ReplySimple";
import axios from "axios";
export default {
  name: "MyReplyPage",
  components:{ReplySimple},
  data:function (){
    return{
      replyData:null,
      pageNum:1,
      pageSize:1,
    }
  },
  created() {
    this.getMyReply()
  },
  methods:{
    async getMyReply(){
      let res=await axios.get("/api/reply/getBySenderId",{
        params: {
          senderId:this.$store.state.userData.userId,
        }
      })
      console.log(res)
      this.replyData=res.data.data
    },
    nextPage:function (){
      if(this.replyData.hasNextPage){
        this.getMyReply();
      }
    },
    prevPage:function () {
      if(this.replyData.hasPreviousPage){
        this.getMyReply();
      }
    },
  }
}
</script>

<style scoped>

</style>