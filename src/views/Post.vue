<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="8" offset="2" key="0" v-if="post !== null">
          <p>{{post["title"]}}</p>
          <v-divider/><br/>
          <v-card min-height="40%">
            <p>{{post["content"]}}</p>
            <v-img v-if="'imgUrl' in post" :src="this.OssUrl+post['imgUrl']" max-height="30%"
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
  props: ["id"],
  data: function (){
    return{
      post: null,
      replies: [],
    }
  },
  created() {
    let vm = this
    init()
    async function init(){
      try{
        await vm.getPost()
        await vm.getReplies()
      }catch (e){
        console.log(e)
      }
    }
  },
  methods:{
    getPost(){
      let vm = this
      axios.get("http://localhost:4396/post/get", {params:{id: this.id}})
      .then(res=>{
        if(res["status"] == 200 && res["data"]["status"] == 200){
          vm.post = res["data"]["data"]
        }
        else
          throw new Error("get post error")
      })
    },
    getReplies(){
      let vm = this
      axios.get("http://localhost:4396/reply/getByPostId", {params:{postId: this.id}})
      .then(res=>{
        if(res["status"] == 200){
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

</style>