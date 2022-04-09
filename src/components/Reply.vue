<template>
    <v-card outlined tile>
      <v-row no-gutters>
        <v-col cols="2">
          <v-card elevation="0" tile height="100%" color="rgb(251, 251, 253)">
            <v-menu open-on-hover bottom left offset-y>
              <template v-slot:activator="{ on}">
                <v-list-item>
                  <v-list-item-content v-on="on">
                    <v-list-item-avatar size="10%">
                      <v-img :src="OssUrl+reply.sender.userAvatar"></v-img>
                    </v-list-item-avatar>
                    <br/><br/>
                    <v-list-item-title>{{ reply.sender.userName }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar size="80">
                      <v-img :src="OssUrl+reply.sender.userAvatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ reply.sender.userName }}</v-list-item-title>
                      <v-spacer></v-spacer>
                      <v-list-item-icon>
                        <v-btn icon @click="beginChat">
                          <v-icon color="green lighten-1">mdi-chat-plus-outline</v-icon>
                        </v-btn>
                      </v-list-item-icon>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card elevation="0" tile>
            <v-list>
              <v-list-item three-line>
                  {{ reply.content }}
              </v-list-item>
              <picture-preview :img-url="reply['imgUrl']"></picture-preview>
              <v-list-item>
                <v-spacer></v-spacer>
                {{ reply.sendTime }}
              </v-list-item>
              <v-list-item>
                <v-btn text right v-if="myReply" @click="deleteReply">删除</v-btn>
                <v-spacer></v-spacer>
                <v-text-field v-if="isReply" v-model="innerReply"></v-text-field>
                <v-btn v-if="isReply" @click="sendInnerReply">回复</v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
import axios from "axios";
import PicturePreview from "@/components/PicturePreview";

export default {
  name: "Reply",
  components: {PicturePreview},
  props: {
    reply: Object,
    isReply: Boolean,
  },
  data: function () {
    return {
      innerReply: null,
      replyTo: null,
    }
  },
  computed: {
    myReply() {
      return this.isReply && this.$store.state.loginState.isLogin && this.$store.state.userData.userId === this.reply.senderId
    },
  },
  methods: {
    deleteReply() {
      axios.post("/api/reply/delete", null, {
        params: {replyId: this.reply.replyId},
        headers: {Authorization: this.$store.state.loginState.token}
      }).then(res => {
        console.log(res)
        this.$router.push("/refresh")
      })
    },
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
    beginChat(){
      if(this.reply["sender"]["userId"] === this.$store.state.userData.userId)
        return;
      else {
        axios.post("/api/message/contact/add", null, {
          params: {contactId: this.reply["sender"]["userId"]},
          headers: {Authorization: this.$store.state.loginState.token}
        }).then(res => {
          if (res["status"] === 200 && res["data"]["status"] === 200) {
            // console.log(this.reply["sender"])
            this.$store.commit("message/addNewContact", this.reply["sender"])
            this.$store.commit("message/showMessage")
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
