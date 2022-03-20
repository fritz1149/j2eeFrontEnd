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
            <v-sheet
                min-height="100vh"
                rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
<!--    <post-preview v-for="(p,i) in $data.posts" :key="i" :post-sender="p.sender" :post-title="p.title"-->
<!--                  :post-content="p.content" :post-send-date="p.sendTime" :post-pic-url="p.imgUrl"-->
<!--                  :post-last-replied-time="p.lastRepliedTime"></post-preview>-->
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Home',
  data: function () {
    return {
      user: {
        userName: "huahuaxiaomuzhu"
      },
      posts: []
    }
  },
  components: {
  },
  created() {
    console.log(localStorage)
    this.getSection();
  },
  methods:{
    getSection:function (){
      axios.get("http://localhost:4396/section/index", {
        params: {
          id: 4,
          pageNum: 1,
          pageSize: 10
        }
      }).then((res) => {
        console.log(res.data.data.list)
        this.$data.posts = res.data.data.list
      })
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
