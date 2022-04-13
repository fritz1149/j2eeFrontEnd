<template>
  <v-container>
    <v-row style="margin-top: 30px">
      <v-col cols="10" offset="1">
        <post-preview v-for="(p,i) in this.postData.list" :key="i" :show-section="true" :post-section="p.section"
                      :post-title="p.title" :post-content="p.content" :post-pic-url="p.imgUrl" :post-last-replied-time="p.lastRepliedTime"
                      :post-sender="p.sender" :post-id="p.postId"/>
      </v-col>
    </v-row>
    <v-pagination v-model="pageNum" :length="postData.pages" v-on:input="getMyPost" v-on:next="nextPage" v-on:previous="prevPage">
    </v-pagination>
  </v-container>
</template>

<script>
import axios from "axios";
import PostPreview from "@/components/PostPreview";
export default {
  name: "MyPostPage",
  components:{
    PostPreview
  },
  data:function (){
    return{
      postData:null,
      pageNum:1,
      pageSize:10,
      subData:null,
    }
  },
  created() {
    this.getMyPost()

  },
  methods:{
    async getMyPost(){
      let res=await axios.get("/api/post/getByUser",{
        params: {
          userid:this.$store.state.userData.userId,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
        }
      })
      this.postData=res.data.data
    },
    nextPage:function (){
      if(this.postData.hasNextPage){
        this.getMyPost();
      }
    },
    prevPage:function () {
      if(this.postData.hasPreviousPage){
        this.getMyPost();
      }
    },
  }
}
</script>

<style scoped>

</style>