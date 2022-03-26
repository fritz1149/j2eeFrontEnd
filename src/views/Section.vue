<template>
  <div>
    <div></div>
    <v-main>
      <v-container>
        <v-row >
          <v-col cols="8" offset="2">
            <section-preview v-if="section" :section-avatar="section['avatarUrl']"
              :section-name="section['name']" :section-description="section['description']"
              :section-id="section['sectionId']" :subscription.sync="subscription"

            ></section-preview>
            <div v-if="postData">
              <post-preview v-for="(p,i) in this.postData.list" :key="i" :show-section="false" :post-section="p.section"
                            :post-title="p.title" :post-content="p.content" :post-pic-url="p.imgUrl" :post-last-replied-time="p.lastRepliedTime"
                            :post-sender="p.sender" :post-id="p.postId"/>
            </div>
            <v-pagination v-model="page.currentPage" :length="postData.pages" v-on:input="getPosts" v-on:next="nextPage" v-on:previous="prevPage">

            </v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import axios from "axios";
import PostPreview from "@/components/PostPreview";
import SectionPreview from "@/components/SectionPreview";

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
    }
  },
  components: {
    SectionPreview,
    PostPreview
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
    }
  },computed:{
    isLogin:function (){
      return localStorage.getItem('token')===undefined
    }
  }
}
</script>
<style lang="less">

</style>
