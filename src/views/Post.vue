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
                  <v-img :src="OssUrl+section['avatarUrl']" :aspect-ratio="1/1"
                         max-width="60%" max-height="60%"></v-img>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="post-section-title">{{section["name"]}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="8" v-if="ground_floor && replies">
          <p class="post-title">{{post["title"]}}</p>
          <v-divider/><br/>
          <reply :reply="ground_floor" :is-reply="false" v-if="ground_floor"></reply>
          <loading v-else></loading>
          <reply v-for="(reply, key) in replies" :key="key" :reply="reply" :is-reply="true"></reply>
        </v-col>
        <v-col cols="2">
          <v-dialog width="50%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="blue lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-comment-plus</v-icon>
                &nbsp;写回复
              </v-btn>
            </template>
            <v-card>
              <v-form v-model="reply.allow" ref="replyForm">
                <v-file-input v-model="reply.file" accept="image/*"
                    prepend-icon="mdi-image" :rules="imgRule"
                ></v-file-input>
                <v-text-field v-model="reply.text" placeholder="输入你的回复"
                    :counter="textMax" :rules="textRule"
                ></v-text-field>
                <v-btn @click="submitReply">
                  <v-icon>mdi-comment-check</v-icon>
                  提交
                </v-btn>
              </v-form>
            </v-card>
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
export default {
  name: "Post",
  components: {LoginNotification, Loading, Reply},
  props: ["id"],
  data: function (){
    return{
      post: null,
      replies: [],
      ground_floor: null,
      section: null,
      loginNotification: false,
      notification: "",
      alert: false,
      reply: {
        allow: true,
        text: '',
        file: null,
      },
      textMax: 100,
      imgRule: [
          v=>{ return v === null || v["type"].search("image") != -1 || "只能上传图片" },
      ],
      textRule: [
        v=>{ return v.length <= this.textMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ]
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
      axios.get("/api/reply/getByPostId", {params:{postId: this.id}})
      .then(res=>{
        if(res["status"] === 200 && res["data"]["status"] === 200){
          vm.replies = res["data"]["data"]
          console.log(vm.replies)
        }
        else
          throw new Error("get replies error")
      })
    },
    submitReply(){
      let vm = this
      if(!this.$store.state.loginState.isLogin){
        this.loginNotification = true
        this.notification = "请登陆后再回帖~"
      }
      if(this.$refs["replyForm"].validate()) {
        let formData = new FormData()
        formData.append("content", vm.reply["text"])
        formData.append("postId", vm.id)
        formData.append("file", vm.reply["file"])
        axios.post("/api/reply/send", formData, {
          headers:{
            Authorization: vm.$store.state.loginState.token
          }
        }).then(res=>{
          if(res["status"] == 200 && res["data"]["res"] == 200) {
            vm.$router.push("/refresh")
          }
          else{
            this.alert = true
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.post-section-describe{
  font-size: small;
}
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
