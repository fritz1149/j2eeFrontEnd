<template>
  <v-main>
    <v-container>
      <v-row justify-content="center" v-if="post">
        <v-col cols="2">
          <v-card color="rgb(229, 229, 229)" outlined>
            <v-list color="rgb(243, 245, 248)">
              <v-list-item>
                <v-list-item-subtitle>所在版块：</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-img :src="OssUrl+post['section']['avatarUrl']" :aspect-ratio="1/1"
                         max-width="60%" max-height="60%"></v-img>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="post-section-title">{{post["section"]["name"]}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="8" v-if="post !== null">
          <p class="post-title">{{post["title"]}}</p>
          <v-divider/><br/>
<!--          <v-card min-height="40%">-->
<!--            <p>{{post["content"]}}</p>-->
<!--            <v-img v-if="'imgUrl' in post" :src="OssUrl+post['imgUrl']" max-height="30%"-->
<!--                   max-width="50%"></v-img>-->
<!--          </v-card><br/>-->
          <reply :reply="ground_floor" v-if="ground_floor"></reply>
          <loading v-else></loading>
          <reply v-for="(reply, key) in replies" :key="key" :reply="reply"></reply>
        </v-col>
      </v-row>
      <loading v-else></loading>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import Reply from "@/components/Reply";
import Loading from "@/components/loading";
export default {
  name: "Post",
  components: {Loading, Reply},
  props: ["id"],
  data: function (){
    return{
      post: null,
      replies: [],
      ground_floor: null,
    }
  },
  created() {
    let vm = this
    init()
    async function init(){
      try{
        await vm.getPost()
        await vm.loadGroundFloor()
        await vm.getReplies()
      }catch (e){
        console.log(e)
      }
    }
  },
  methods:{
    getPost(){
      let vm = this
      return axios.get("http://localhost:4396/post/get", {params:{id: this.id}})
      .then(res=>{
        if(res["status"] == 200 && res["data"]["status"] == 200){
          vm.post = res["data"]["data"]
        }
        else
          throw new Error("get post error")
      })
    },
    loadGroundFloor(){
      console.log(this.post)
      try{
        this.ground_floor = {
          sender: this.post["sender"],
          content: this.post["content"],
          sendTime: this.post["sendTime"],
        }
        if("imgUrl" in this.post)
          this.ground_floor["picUrl"] = this.post["imgUrl"]
      }catch (e){
        throw new Error("load ground floor error")
      }
    },
    getReplies(){
      let vm = this
      axios.get("http://localhost:4396/reply/getByPostId", {params:{postId: this.id}})
      .then(res=>{
        if(res["status"] == 200 && res["data"]["status"] == 200){
          vm.replies = res["data"]["data"]
          console.log(vm.replies)
        }
        else
          throw new Error("get replies error")
      })
    }
  }
}
</script>

<style scoped>
.post-section{
  display: inline;
}
.post-section-describe{
  font-size: small;
}
.post-section-title{
  font-size: x-large;
}
.post-section-title:hover{
  color: blue;
  cursor: pointer;
}
.post-title{
  font-weight: bold;
  font-size: x-large;
}
</style>