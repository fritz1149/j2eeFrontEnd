<template>
  <v-main>
    <v-container>
      <v-alert type="error" v-model="alert" dismissible>回复失败，检查一下网络吧</v-alert>
      <v-row justify-content="center" v-if="post">
        <v-col cols="2">
          <v-card color="rgb(229, 229, 229)" outlined>
            <v-list color="rgb(243, 245, 248)">
              <v-list-item>
                <v-list-item-subtitle>所在贴吧：</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="post-section" @click="$router.push('/section/'+section['sectionId'])">
                <v-list-item-content v-if="'avatarUrl' in section">
                  <v-img :src="OssUrl+section['avatarUrl']" :aspect-ratio="1"
                         max-width="60%" max-height="60%"></v-img>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="post-section-title">{{section["name"]}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="8" v-if="ground_floor && replyData">
          <p class="post-title">{{post["title"]}}</p>
          <v-divider/><br/>
          <reply :reply="ground_floor" :is-reply="false" v-if="ground_floor"></reply>
          <loading v-else></loading>
          <reply v-for="(reply, key) in replyData.list" :key="key" :reply="reply" :is-reply="true"
            :style="key !== replyData.list.length?  'border-top-width: 0 !important;' : ''"></reply>
          <br/>
          <v-pagination v-model="replyData.currentPage" :length="replyData.pages" v-on:input="getReplies" v-on:next="nextPage" v-on:previous="prevPage"/>

        </v-col>
        <v-col cols="2">
          <v-dialog width="50%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-if="$store.state.loginState.isLogin"
                  color="blue lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-comment-plus</v-icon>
                &nbsp;写回复
              </v-btn>
              <v-btn
                  color="blue-grey darken-2"
                  dark
                  v-else
                  @click="noticeLogin"
              >
                <v-icon>mdi-comment-plus</v-icon>
                &nbsp;写回复
              </v-btn>
            </template>
            <AddNewReply :id="id"></AddNewReply>
          </v-dialog>
        </v-col>
      </v-row>
      <loading v-else></loading>
    </v-container>
    <login-notification :display.sync="loginNotification" :notification="notification"></login-notification>
  </v-main>
</template>

<script>
import axios from "axios";
import Reply from "@/components/Reply";
import Loading from "@/components/loading";
import LoginNotification from "@/components/LoginNotification";
import AddNewReply from "@/components/AddNewReply";
export default {
  name: "Post",
  components: {LoginNotification, Loading, Reply,AddNewReply},
  props: ["id"],
  data: function (){
    return{
      post: null,
      replyData: null,
      ground_floor: null,
      pageNum:1,
      pageSize:10,
      section: null,
      loginNotification: false,
      notification: "",
      alert: false,
    }
  },
  watch:{
    reply(val){
      console.log(val)
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
      return axios.get("/api/post/get", {params:{id: this.id}})
      .then(res=>{
        if(res["status"] === 200 && res["data"]["status"] === 200){
          vm.post = res["data"]["data"]
          vm.section = vm.post["section"]
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
          imgUrl: this.post["imgUrl"],
        }
      }catch (e){
        throw new Error("load ground floor error")
      }
    },
    getReplies(){
      let vm = this
      axios.get("/api/reply/getByPostId", {params:{postId: this.id,pageNum:this.pageNum,pageSize:this.pageSize}})
      .then(res=>{
        if(res["status"] === 200 && res["data"]["status"] === 200){
          vm.replyData = res["data"]["data"]
          console.log(vm.replyData)
        }
        else
          throw new Error("get replies error")
      })
    },
    nextPage:function (){
      if(this.replyData.hasNextPage){
        this.getReplies();
      }
    },
    prevPage:function () {
      if(this.replyData.hasPreviousPage){
        this.getReplies();
      }
    },
    noticeLogin(){
      this.loginNotification = true
      this.notification = '请登陆后再关注~'
    },
  }
}
</script>

<style scoped>
/*.post-section-describe{*/
/*  font-size: small;*/
/*}*/
.post-section-title{
  font-size: x-large;
}
.post-section:hover .post-section-title{
  color: blue;
  cursor: pointer;
}
.post-title{
  font-weight: bold;
  font-size: x-large;
}
</style>
