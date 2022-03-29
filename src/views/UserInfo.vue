<template>
  <v-container>
    <v-alert type="error" v-model="alert" dismissible>更新失败，检查一下网络吧</v-alert>
    <v-main>
      <v-row>
        <v-col cols="6" offset="3">
          <v-card>
            <v-list>
              <v-list-item >
                <v-list-item-avatar id="avatar" size="100">
                  <v-img :src="imgUrl" @mouseenter="startHover" @mouseleave="endHover" @click="updateAvatar = true"></v-img>
                </v-list-item-avatar>
                <v-list-item-title v-text="user['userName']"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <v-dialog v-model="updateAvatar">
      <v-card>
        <v-form v-model="upload.allow" ref="avatarForm">
          <v-file-input v-model="upload.file" accept="image/*"
                        prepend-icon="mdi-image" :rules="imgRule" placeholder="上传你的新头像">
          </v-file-input>
          <v-btn @click="submitAvatar">
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfo",
  computed:{
    user(){
      return this.$store.state.userData
    },
    imgUrl(){
      return this.hover ? require('../assets/updateAvatar.png') : this.OssUrl + this.user['userAvatar']
    }
  },
  created() {
    console.log(this.user)
  },
  data(){
    return{
      hover: false,
      updateAvatar: false,
      imgRule: [
        v=>{ return (v !== null && v["type"].search("image") != -1) || "请上传图片" },
      ],
      upload:{
        allow: true,
        file: null,
      },
      alert: false,
    }
  },
  methods:{
    submitAvatar(){
      if(this.$refs["avatarForm"].validate()) {
        let formData = new FormData()
        formData.append("pic", this.upload.file)
        axios.post("/api/user/avatar", formData, {headers:{Authorization:this.$store.state.loginState.token}})
        .then(res=>{
          if(res["status"] == 200 && res["data"]["status"] == 200){
            let newInfo = Object.create(this.$store.state.userData)
            newInfo.userAvatar = res["data"]["userAvatar"]
            this.$store.commit("userData/saveUserData", newInfo)
            this.$router.push("/refresh")
          }
          else{
            this.alert = true
          }
        })
      }
    },
    startHover(){
      this.hover = true
    },
    endHover(){
      this.hover = false
    }
  }
}
</script>

<style scoped>
#avatar{
  cursor: pointer;
}
</style>