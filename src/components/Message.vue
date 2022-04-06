<template>
  <v-dialog v-model="display" @click:outside="$emit('update:display', false)">
    <v-card>
      <p>hello message</p>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "Message",
  props:["display"],
  computed: {
    isLogin(){return this.$store.state.loginState.isLogin && this.$store.state.userData["userId"] !== null},
    userId(){return this.$store.state.userData["userId"];},
    token(){return this.$store.state.loginState.token;},
    socketPath(){return "ws://" + location.host + "/websocket/" + this.$store.state.userData.userId;}
  },
  watch:{
    isLogin(val){
      if(val === true){
        this.connectSocket()
      }
      else{
        this.socket.close()
        clearTimeout(this.reconnectTimer)
      }
    }
  },
  beforeDestroy() {
    this.socket.close()
  },
  data(){
    return{
      socket: null,
      reconnectTimer: null,
      connected: false,
      contact: [],
    }
  },
  created(){
    if(this.isLogin)
      this.connectSocket()
  },
  methods:{
    connectSocket(){
      let vm = this
      if(vm.connected)
        return

      let socketPath = "ws://" + location.host + "/websocket/" + this.$store.state.userData.userId;
      console.log("going to websocket" + socketPath)
      this.socket = new WebSocket(socketPath)
      this.socket.onopen = function (){
        console.log("socket connected")
        vm.connected = true
        vm.getContact()
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
        // console.log("socket close " + vm.isLogin + " " + vm.$store.state.loginState.isLogin + " " + vm.$store.state.userData["userId"])
        console.log("socket close")
        vm.contact = []
        if(vm.isLogin){
          console.log("socket set time out: 10s")
          vm.connected = false
          vm.reconnectTimer = setTimeout(vm.connectSocket, 10000)
        }
      }
    },
    getContact(){
      axios.get("/api/message/contact", {headers:{Authorization: this.$store.state.loginState.token}})
      .then(res=>{
        console.log(res)
      })
    }
  },
}
</script>

<style scoped>

</style>