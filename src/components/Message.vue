<template>
  <v-dialog  v-model="display" width="80%"
            @click:outside="$store.commit('message/hideMessage')">
    <v-container>
      <v-row  no-gutters>
        <v-col cols="3">
          <v-card height="700" class="pa-4" outlined tile>
          <v-list style="background-color: #e4edff" three-line height="100%">
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
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card id="msgCard" height="700" class="pa-4" style="overflow: auto" outlined tile>
            <v-list v-if="contactSelected !== null && contactSelected !== undefined" style="background-color: #e4edff">
              <v-list-item-group >
                <v-list-item v-for="(message, key) in historyFocused" :key="key">
                  <v-list-item-avatar size="50px">
                    <v-img :src="OssUrl+contactFocused['userAvatar']"
                           v-if="message['senderId'] !== $store.state.userData.userId"></v-img>
                    <v-img :src="OssUrl+$store.state.userData.userAvatar" v-else></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content style="width: 100%" v-if="message['senderId'] !== $store.state.userData.userId">
                    <v-list-item-title style="color: #3c97bf" v-if="message['senderId'] !== $store.state.userData.userId">
                      {{contactFocused['userName'] }}</v-list-item-title>
                    <v-card color="white" class="pa-5" max-width="66%" >
                      {{message['content']}}
                      <picture-preview v-if="message['imgUrl']" :img-url="message['imgUrl']"></picture-preview>
                    </v-card>
                  </v-list-item-content>
                  <v-list-item-content class="myMessage" style="width: 100%" v-else>
                    <v-list-item-title style="color: #42b983" >
                      {{ $store.state.userData.userName }}</v-list-item-title>
                    <v-card color="#0e153a" class="pa-5 myMessageContent"  max-width="66%" >
                      {{message['content']}}
                      <picture-preview v-if="message['imgUrl']" :img-url="message['imgUrl']"></picture-preview>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>


              </v-list-item-group>
            </v-list>
            <v-card v-if="contactSelected !== null && contactSelected !== undefined" style="margin-top: 10px;" color="#e4edff" class="pa-2">
              <add-new-message v-if="contactFocused"
                               :contact-id="contactFocused['userId']" @send="pushBackMessage"></add-new-message>
            </v-card>
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
        this.contact = []
        this.history = new Map()
        this.historyFocused = []
        this.contactIdMap = new Map()
        this.contactSelected = null
        this.scrollTop = []
      }
    },
    newContact(val){
      if(val !== null){
        let data = this.$store.state.message.newContact
        if(!this.contactIdMap.has(data["userId"])) {
          this.addContact(data["userId"])
          .then(()=>{
            this.contactSelected = this.contactIdMap.get(data["userId"])
          })
        }
        this.$store.commit("message/popNewContact")
      }
    },
    contactSelected(val, oldVal){
      let msgCard = document.querySelector('#msgCard')
      // console.log(val + " " + oldVal)
      if(oldVal !== null && oldVal !== undefined){
        if(this.contactIdMap.has(oldVal))
          this.scrollTop[oldVal] = msgCard.scrollTop
        // console.log(msgCard.scrollTop)
      }
      if(val !== null && val !== undefined){
        // console.log("??")
        this.historyFocused = this.history.get(this.contact[val]["userId"])
      }
      else{
        this.historyFocused = []
      }
    },
    historyFocused(val){
      let vm = this
      // console.log(val)
      if(val){
        let msgCard = document.querySelector('#msgCard')
        this.$nextTick(function (){
          // console.log(vm.contactSelected in vm.scrollTop)
          msgCard.scrollTop = vm.contactSelected in vm.scrollTop ? vm.scrollTop[vm.contactSelected] : msgCard.scrollHeight
        })
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
      contactIdMap: new Map(),
      contactSelected: null,
      scrollTop: [],
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
        if(type === "message"){
          let senderId = msg["senderId"]
          console.log(senderId)
          if(!vm.contactIdMap.has(senderId)){
            vm.addContact(senderId)
          }
          else{
            vm.history.get(senderId).push(msg)
          }
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
      return axios.get("/api/user/get", {params:{"id": contactId}})
          .then(res=>{
            console.log("new contact: ");
            console.log(res)
            if(res["status"] === 200 && res["data"]["status"] === 200){
              vm.contact.push(res["data"]["data"])
            }
          }).then(()=>{
        vm.contactIdMap.set(contactId, vm.contact.length - 1)
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
          for(let index in res["data"]["data"]){
            // console.log(unit)
            let userId = res["data"]["data"][index]["userId"]
            vm.contactIdMap.set(userId, index)
            vm.getHistory(1, 15, userId, index, true)
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
            // console.log("history load: " + contactId)
            // console.log(vm.history.get(contactId))
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
        // console.log(res)
        // console.log(vm.scrollTop + " " + index)
        if(res["status"] === 200 && res["data"]["status"] === 200){
          let data = vm.contact[index]
          vm.contact.splice(index, 1)
          // console.log("splice " + index)
          vm.scrollTop.splice(index, 1)
          vm.history.delete(contactId)
          vm.contactIdMap.delete(data["userId"])
          vm.contactSelected = null
          vm.historyFocused = []
        }
      }).then(()=>{
        for(let i = index; i < vm.contact.length; i++){
          vm.contactIdMap.set(vm.contact[i]["userId"], i)
        }
      }).then(()=>{
        // console.log(vm.contactIdMap)
        // console.log(vm.scrollTop)
      })
    },
    pushBackMessage(msg){
      this.historyFocused.push(msg)
    }
  },
}
</script>

<style lang="less">
.myMessage{
  .v-card{
    color: white;
  }
}
</style>