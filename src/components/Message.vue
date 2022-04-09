<template>
  <v-dialog v-model="display" width="80%"
            @click:outside="$store.commit('message/hideMessage')">
    <v-container>
      <v-row no-gutters>
        <v-col cols="2">
          <v-list three-line height="100%">
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
                      <v-icon color="red lighten-1" @click="removeContact(user['userId'], key)">mdi-account-remove</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="10">
          <v-card outlined tile height="100%">
            <v-list v-if="contactSelected !== null && contactSelected !== undefined">
              <v-list-item-group>
                <v-list-item v-for="(message, key) in historyFocused" :key="key">
                  <v-list-item-avatar size="5%">
                    <v-img :src="OssUrl+contactFocused['userAvatar']"
                           v-if="message['senderId'] !== $store.state.userData.userId"></v-img>
                    <v-img :src="OssUrl+$store.state.userData.userAvatar" v-else></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title style="color: #3c97bf" v-if="message['senderId'] !== $store.state.userData.userId">
                      {{contactFocused['userName'] }}</v-list-item-title>
                    <v-list-item-title style="color: #42b983" v-else>
                      {{ $store.state.userData.userName }}</v-list-item-title>
                    {{message['content']}}
                    <picture-preview :img-url="message['imgUrl']"></picture-preview>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-divider></v-divider>
            <add-new-message v-if="contactFocused"
                 :contact-id="contactFocused['userId']" @send="pushBackMessage"></add-new-message>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
import axios from "axios";
import AddNewMessage from "@/components/AddNewMessage";
import PicturePreview from "@/components/PicturePreview";

export default {
  name: "Message",
  components: {PicturePreview, AddNewMessage},
  computed: {
    isLogin(){return this.$store.state.loginState.isLogin && this.$store.state.userData["userId"] !== null},
    userId(){return this.$store.state.userData["userId"];},
    token(){return this.$store.state.loginState.token;},
    socketPath(){return "ws://" + location.host + "/websocket/" + this.$store.state.userData.userId;},
    newContact(){return this.$store.state.message.newContact;},
    display(){return this.$store.state.message.showMessage;},
    contactFocused(){return this.contact[this.contactSelected]},
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
    },
    newContact(val){
      if(val !== null){
        let data = this.$store.state.message.newContact
        if(!this.contactIdSet.has(data["userId"])) {
          this.addContact(data["userId"])
        }
        this.$store.commit("message/popNewContact")
      }
    },
    contactSelected(val){
      if(val !== null && val !== undefined){
        console.log(this.contact[val])
        this.historyFocused = this.history.get(this.contact[val]["userId"])
        console.log(this.historyFocused)
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
      history: new Map(),
      historyFocused: [],
      contactIdSet: new Set(),
      contactSelected: null,
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
        let type = msg["type"]
        msg = msg["data"]
        let senderId = msg["senderId"]
        console.log(senderId)
        if(!vm.contactIdSet.has(senderId)){
          vm.addContact(senderId)
        }
        else{
          vm.history.get(senderId).push(msg)
        }
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
    addContact(contactId){
      let vm = this
      vm.contactIdSet.add(contactId)
      axios.get("/api/user/get", {params:{"id": contactId}})
          .then(res=>{
            console.log("new contact: ");
            console.log(res)
            if(res["status"] === 200 && res["data"]["status"] === 200){
              vm.contact.push(res["data"]["data"])
            }
          }).then(()=>{
        vm.getHistory(1, 15, contactId, vm.contact.length - 1, true)
      })
    },
    getContact(){
      let vm = this;
      axios.get("/api/message/contact", {headers:{Authorization: this.$store.state.loginState.token}})
      .then(res=>{
        if(res["status"] === 200 && res["data"]["status"] === 200){
          vm.contact = res["data"]["data"]
          console.log(res["data"]["data"])
          for(let unit in res["data"]["data"]){
            // console.log(unit)
            let userId = res["data"]["data"][unit]["userId"]
            vm.contactIdSet.add(userId)
            vm.getHistory(1, 15, userId, unit, true)
          }
        }
      })
    },
    getHistory(pageNum, pageSize, contactId, index, init){
      let vm = this
      axios.get("/api/message/get", {
        headers:{Authorization: this.$store.state.loginState.token},
        params:{contactId: contactId, pageNum: pageNum, pageSize: pageSize}
      }).then(res=>{
        if(res["status"] === 200 && res["data"]["status"] === 200){
          if(init === true){
            vm.history.set(contactId, res["data"]["data"]["list"].reverse())
            console.log("history load: " + contactId)
            console.log(vm.history.get(contactId))
            if(index === vm.contactSelected)
              vm.historyFocused = vm.history.get(contactId)
          }
        }
      })
    },
    removeContact(contactId, index){
      let vm = this
      axios.post("/api/message/contact/remove", null,{
        headers:{Authorization: this.$store.state.loginState.token},
        params: {contactId: contactId}
      }).then(res=>{
        console.log(res)
        if(res["status"] === 200 && res["data"]["status"] === 200){
          let data = vm.contact[index]
          vm.contact.splice(index, 1)
          vm.history.delete(contactId)
          vm.contactIdSet.delete(data["userId"])
          vm.contactSelected = null
        }
      })
    },
    pushBackMessage(msg){
      this.historyFocused.push(msg)
    }
  },
}
</script>

<style scoped>

</style>