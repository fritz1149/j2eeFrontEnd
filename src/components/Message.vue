<template>
  <v-dialog v-model="display" width="80%"
            @click:outside="$emit('update:display', false)">
    <v-container>
      <v-row no-gutters>
        <v-col cols="2">
          <v-list three-line>
            <v-list-item-group v-model="contactSelected">
              <v-list-item v-for="(user, key) in contact" :key="key">
                <v-list-item-avatar size="40%">
                  <v-img :src="OssUrl+user['userAvatar']"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user['userName'] }}</v-list-item-title>
                  <v-spacer></v-spacer>
                  <v-list-item-icon>
                    <v-btn icon>
                      <v-icon color="red lighten-1">mdi-account-remove</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="10">
          <v-card outlined tile height="100%">
            <v-list>
              xx
            </v-list></v-card>
        </v-col>
      </v-row>
    </v-container>
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
      contactSelected: 0,
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
      let vm = this;
      axios.get("/api/message/contact", {headers:{Authorization: this.$store.state.loginState.token}})
      .then(res=>{
        console.log(res)
        if(res["status"] === 200 && res["data"]["status"] === 200){
          vm.contact = res["data"]["data"]
        }
      })
    }
  },
}
</script>

<style scoped>

</style>