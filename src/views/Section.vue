<template>
  <div>
    <div class="SectionBackground"></div>
    <v-main>
      <v-container>
        <v-alert type="error" v-model="alert" dismissible>发帖失败，检查一下网络吧</v-alert>
        <v-row >
          <v-col cols="8" offset="2">
            <section-preview v-if="section" :section-avatar="section['avatarUrl']"
              :section-name="section['name']" :section-description="section['description']"
              :section-id="section['sectionId']" :subscription.sync="subscription"
              @notLogged="noticeLogin"
            ></section-preview>
            <div v-if="postData">
              <post-preview v-for="(p,i) in this.postData.list" :key="i" :show-section="false" :post-section="p.section"
                            :post-title="p.title" :post-content="p.content" :post-pic-url="p.imgUrl" :post-last-replied-time="p.lastRepliedTime"
                            :post-sender="p.sender" :post-id="p.postId"/>
            </div>
            <v-pagination v-model="page.currentPage" :length="postData.pages" v-on:input="getPosts" v-on:next="nextPage" v-on:previous="prevPage">

            </v-pagination>
          </v-col>

          <v-col cols="2">
            <v-dialog width="50%">
              <template v-slot:activator="{on}">
                <v-btn
                    v-if="$store.state.loginState.isLogin"
                    color="blue darken-2"
                    dark
                    large
                    v-on="on"
                >
                  <v-icon>mdi-pencil-plus</v-icon>
                  &nbsp;发帖
                </v-btn>
                <v-btn
                    v-else
                    color="blue-grey darken-2"
                    dark
                    large
                    @click="noticeLogin"
                >
                  <v-icon>mdi-pencil-plus</v-icon>
                  &nbsp;发帖
                </v-btn>
              </template>
              <AddNewPost :section="section" @addPostError="alert = true"></AddNewPost>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <login-notification :display.sync="snackbar" :notification="notification"></login-notification>
  </div>
</template>

<script>

import axios from "axios";
import PostPreview from "@/components/PostPreview";
import SectionPreview from "@/components/SectionPreview";
import LoginNotification from "@/components/LoginNotification";
import AddNewPost from "@/components/AddNewPost";
export default {
  name: 'Home',
  props: ["id"],
  data: function () {
    return {
      user: {
        userName: "huahuaxiaomuzhu"
      },
      postData: {},
      page:{
        currentPage:1,
        pageSize:10
      },
      section: null,
      subscription: false,
      snackbar: false,
      notification: '',
      alert: false,
    }
  },
  components: {
    LoginNotification,
    SectionPreview,
    PostPreview,
    AddNewPost
  },
  created() {
    this.getSection();
    this.getPosts();
  },
  methods:{
    getSection(){
      axios.get("/api/section/get", {
        params:{id: this.id},
        headers:{Authorization: this.$store.state.loginState.token}
      })
      .then(res=>{
        if(res["status"] === 200 && res["data"]["status"] === 200){
          this.section = res["data"]["data"]
          this.subscription = res["data"]["subscription"]
          console.log(res)
        }
        else
          throw new Error("get section error")
      })
    },
    getPosts:function (){
      axios.get("/api/section/index", {
        params: {
          id: this.id,
          pageNum: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      }).then((res) => {
        console.log(res.data.data.list)
        this.$data.postData = res.data.data
      })
    },
    nextPage:function (){
      if(this.postData.hasNextPage){
        this.getPosts();
      }
    },
    prevPage:function () {

      if(this.postData.hasPreviousPage){
        this.getPosts();
      }
    },
    changeSubscription(){
      this.subscription = !this.subscription;
    },
    noticeLogin(){
      this.snackbar = true
      this.notification = '请登陆后再关注~'
    },
    submitPost(){
      let vm = this
      if(!this.$store.state.loginState.isLogin){
        this.snackbar = true
        this.notification = '请登陆后再发帖~'
      }
      if(this.$refs["postForm"].validate()) {
        let formData = new FormData()
        formData.append("title", vm.post["title"])
        formData.append("content", vm.post["text"])
        formData.append("section", vm.section["sectionId"])
        console.log(vm.section["sectionId"])
        formData.append("pic", vm.post["file"])
        axios.post("/api/post/add", formData, {
          headers:{
            Authorization: vm.$store.state.loginState.token
          }
        }).then(res=>{
          if(res["status"] === 200 && res["data"]["status"] === 200) {
            vm.$router.push("/refresh")
          }
          else{
            this.alert = true
          }
        })
      }
    }
  },
  computed:{
    isLogin:function (){
      return localStorage.getItem('token')===undefined
    }
  }
}
</script>
<style lang="less">
.SectionBackground{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/section_bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
