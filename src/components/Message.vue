<template>
  <v-dialog v-model="display" @click:outside="$emit('update:display', false)">
    <v-card>
      <p>hello message</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Message",
  props:["display"],
  computed: {
    isLogin(){return this.$store.state.loginState.isLogin && this.$store.state.userData["userId"] !== null},
    socketPath(){return "ws://" + location.host + "/websocket/" + this.$store.state.userData.userId;}
  },
  watch:{
    isLogin(val){
      if(val === true){
        this.connectSocket()
      }
      else{
        this.socket.close()
      }
    }
  },
  data(){
    return{
      socket: null,
    }
  },
  created(){
    if(this.isLogin)
      this.connectSocket()
  },
  methods:{
    connectSocket(){
      let socketPath = "ws://" + location.host + "/websocket/" + this.$store.state.userData.userId;
      console.log("going to websocket" + socketPath)
      console.log(this.isLogin)
      this.socket = new WebSocket(socketPath)
      this.socket.onopen = function (){
        console.log("socket connected")
      }
      this.socket.onerror = function (){
        console.log("socket error")
      }
      this.socket.onmessage = function (msg){
        console.log("socket message:")
        msg = JSON.parse(msg["data"])
        console.log(msg)
      }
      this.socket.onclose = function (){
        console.log("socket close")
      }
    }
  },
}
</script>

<style scoped>

</style>