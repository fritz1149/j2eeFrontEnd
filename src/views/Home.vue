<template>
  <div class="home">
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
                    <v-list-item-title>
                      关注的吧
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="my-2"></v-divider>
                <v-list-item
                    v-for="n in 5"
                    :key="n"
                    link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-avatar
                          class="mr-10"
                          color="grey darken-1"
                          size="32"
                      ></v-avatar>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>


              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-list>
              <v-list-item v-for="(p,i) in this.postData.list" :key="i">
                <post-preview :show-section="true" :post-section="p.section"
                              :post-title="p.title" :post-content="p.content" :post-pic-url="p.imgUrl" :post-last-replied-time="p.lastRepliedTime"
                              :post-id="p.postId"/>
              </v-list-item>
            </v-list>
            <v-pagination v-model="timeLine.currentPage" :length="postData.pages" v-on:next="nextPage" v-on:previous="prevPage">

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
      timeLine:{
        currentPage:1,
        pageSize:10
      }
    }
  },
  components: {
    PostPreview
  },
  created() {
    console.log(localStorage)
    this.getTimeLine();
  },
  methods:{
    getTimeLine:function (){
      axios.get("http://localhost:4396/post/timeline", {
        params: {
          pageNum: this.timeLine.currentPage,
          pageSize: this.timeLine.pageSize
        }
      }).then((res) => {
        console.log(res.data.data.list)
        this.$data.postData = res.data.data
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
    }
  },computed:{
    isLogin:function (){
        return localStorage.getItem('token')===undefined
    }
  }
}
</script>
<style>
.home{
  z-index: 1;
  background-image: url("../assets/background.bc725153.png") ;
}
</style>
