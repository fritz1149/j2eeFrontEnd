<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="8" offset="2" key="0">
          <p>{{post["postTitle"]}}</p>
          <v-divider/><br/>
          <v-card min-height="40%">
            <p>{{post["postContent"]}}</p>
            <v-img v-if="'postPicUrl' in post" :src="this.OssUrl+post['postPicUrl']" max-height="30%"
                   max-width="50%"></v-img>
          </v-card><br/>
          <div v-for="(reply, index) in replies" :key="index" style="height: 100%">
            <v-card min-height="40%">
              <p>{{reply["content"]}}</p>
                          <v-img v-if="'imgUrl' in reply" :src="this.OssUrl+reply['imgUrl']" max-height="30%"
                                 max-width="50%"></v-img>
            </v-card><br/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Post",
  data: function (){
    return{
      id: null,
      post: null,
      replies: [],
    }
  },
  created() {
    new Promise((resolve)=>{
      let data = this.$route.query["post"]
      this.post = JSON.parse(String(data))
      this.id = this.post["postId"]
      resolve()
    }).then(()=>{this.getReplies()})
  },
  methods:{
    getReplies(){
      axios.get("/reply/getByPostId", {params:{postId: this.id}})
      .then(res=>{
        console.log("replies: ")
        console.log(res)
        if(res["status"] == 200){
          this.replies = res["data"]["data"]
        }
      })
    }
  }
}
</script>

<style scoped>

</style>