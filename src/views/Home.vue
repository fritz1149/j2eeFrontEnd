<template>
  <div class="home">
    <div class="HomeBackground"></div>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">

              <v-list color="transparent">
                <v-list-item
                    link
                    color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title v-if="isLogin">
                      关注的吧
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      大家在看
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="my-2"></v-divider>
                <v-list-item
                    v-for="(n,i) in this.sectionData" :key="i"
                  @click="toSection(n.sectionId)">
                  <v-list-item-content >
                    <v-list-item-title>
                      <v-avatar><v-img :src="self.OssUrl+n.avatarUrl"></v-img></v-avatar>
                      {{n.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="8">
            <div  class="HomePostPreview">
              <post-preview v-for="(p,i) in this.postData.list" :key="i" :show-section="true" :post-section="p.section"
                            :post-title="p.title" :post-content="p.content" :post-pic-url="p.imgUrl" :post-last-replied-time="p.lastRepliedTime"
                            :post-sender="p.sender" :post-id="p.postId"/>
            </div>
            <v-pagination v-model="timeLine.currentPage" :length="postData.pages" v-on:input="getTimeLine" v-on:next="nextPage" v-on:previous="prevPage">

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

export default {
  name: 'Home',
  data: function () {
    return {
      user: {
        userName: "huahuaxiaomuzhu"
      },
      postData: {},
      sectionData: [],
      timeLine:{
        currentPage:1,
        pageSize:10
      },
      self:this
    }
  },
  components: {
    PostPreview
  },beforeMount() {
  },
  created() {
    this.getSection();
    this.getTimeLine();
  },
  methods:{
    getTimeLine:function (){
      axios.get("/api/post/timeline", {
        params: {
          pageNum: this.timeLine.currentPage,
          pageSize: this.timeLine.pageSize
        }
      }).then((res) => {
        console.log(res.data.data.list)
        this.$data.postData = res.data.data
        this.toTop();
      })
    },
    nextPage:function (){
      if(this.postData.hasNextPage){
        this.getTimeLine();
      }

    },
    prevPage:function () {
      if(this.postData.hasPreviousPage){
        this.getTimeLine();
      }
    },
    getSection:function (){
      if(this.isLogin){
        axios.get('/api/section/',{
          headers:{
            'Authorization':this.$store.state.loginState.token
          }
        }).then((res)=>{
          this.sectionData=res.data.data
        })
      }else{
        axios.get('/api/section/').then((res)=>{
          this.sectionData=res.data.data
        })
      }
    },
    toSection:function (sectionId){
      this.$router.push('/section/'+sectionId)
    },
    toTop(){
      this.$vuetify.goTo(0,"easeInOutCubic")
    }
  },

  computed:{
    isLogin:function (){
        return this.$store.state.loginState.isLogin
    }
  }
}
</script>
<style lang="less">
.home{
}
.HomeBackground{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/background.bc725153.png");
  background-size: cover;
  background-position: center;
}

</style>
