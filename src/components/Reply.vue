<template>
<div>
  <v-container >
    <v-row no-gutters >
      <v-col cols="2">
        <v-card height="200">
          <v-list-item>
            <v-list-item-avatar height="150" width="150"><v-img :src="this.OssUrl+reply.sender.userAvatar"></v-img></v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-subtitle>{{reply.sender.userName}}</v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card height="200">
          <v-list-item three-line>
              {{reply.content}}
              <v-img v-if="'imgUrl' in reply" :src="this.OssUrl+reply.imgUrl" max-height="100" :aspect-ratio="1"></v-img>
            <v-col cols="2">{{reply.sendTime}}</v-col>
          </v-list-item>
          <v-list-item>
            <v-spacer></v-spacer>
              <v-text-field v-if="isReply" v-model="innerReply"></v-text-field><v-btn v-if="isReply" @click="sendInnerReply" >回复</v-btn>
          </v-list-item>
          <v-btn text right v-if="myReply" @click="deleteReply">删除</v-btn>

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
    isReply: Boolean,
  },
  data:function (){
    return {
      innerReply:null,
      replyTo:null,
    }
  },
  computed:{
    myReply(){
      return this.isReply && this.$store.state.loginState.isLogin && this.$store.state.userData.userId === this.reply.senderId
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
    },
    sendInnerReply(){
      axios.post("/api/inner/add",{
        replyID:this.reply.replyId,
        content:this.innerReply,
        replyTo:this.replyTo
      },{
        headers:{
          'Authorization':this.$store.state.loginState.token
        }
      }).then(()=>{
      this.$router.push("/refresh")
      })
    }
  }
}
</script>

<style scoped>

</style>
