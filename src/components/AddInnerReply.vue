<template>
  <v-card color="grey lighten-5"  class="pa-5" >
    <v-textarea placeholder="输入你的回复" filled v-model="innerReply"></v-textarea>
    <div style="display: flex;justify-content: flex-end">
      <v-btn color="primary" style=""  @click="sendInnerReply">回复</v-btn>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "AddInnerReply",
  props:['reply','replyTo'],
  data:function (){
    return{
      innerReply: null,
    }
  },
  methods:{
    sendInnerReply() {
      axios.post("/api/inner/add", {
        replyID: this.reply.replyId,
        content: this.innerReply,
        replyTo: this.replyTo
      }, {
        headers: {
          'Authorization': this.$store.state.loginState.token
        }
      }).then(() => {
        this.$router.push("/refresh")
      })
    },
  }
}
</script>

<style scoped>

</style>