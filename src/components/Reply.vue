<template>
<div>
  <v-container >
    <v-row no-gutters >
      <v-col cols="2">
        <v-card height="200">
          <v-list-item>
            <v-list-item-avatar height="150" width="150"><v-img :src="this.OssUrl+reply.sender.userAvatar"></v-img></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card height="200">
          <v-list-item three-line>
              {{reply.content}}
              <v-img v-if="'imgUrl' in reply" :src="this.OssUrl+reply.imgUrl" max-height="100" :aspect-ratio="1/1"></v-img>
            <v-col cols="2">{{reply.sendTime}}</v-col>
          </v-list-item>
          <v-list-item>
            <v-spacer></v-spacer>
            <v-btn text right v-if="myReply" @click="deleteReply">删除</v-btn>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Reply",
  props:{
    reply: Object,
  },
  computed:{
    myReply(){
      return this.$store.state.loginState.isLogin && this.$store.state.userData.userid == this.reply.senderId
    }
  },
  methods:{
    deleteReply(){
      axios.post("/api/reply/delete", null, {
        params:{replyId: this.reply.replyId},
        headers:{Authorization: this.$store.state.loginState.token}
      }).then(res=>{
        console.log(res)
        this.$router.push("/refresh")
      })
    }
  }
}
</script>

<style scoped>

</style>
