<template>
  <v-container>
    <v-alert type="error" v-model="alert" dismissible>更新失败，检查一下网络吧</v-alert>
    <v-main>
      <v-row>
        <v-col cols="8" offset="2">
          <v-card>
            <v-list>
              <v-list-item >
                <v-list-item-avatar id="avatar" size="100">
                  <v-img :src="imgUrl" @mouseenter="startHover" @mouseleave="endHover" @click="updateAvatar = true"></v-img>
                </v-list-item-avatar>
                <v-list-item-title style="font-weight: bold;font-size: 20px" v-text="user['userName']"></v-list-item-title>
<!--                <v-btn @click="updateName">changeName</v-btn>-->
              </v-list-item>
            </v-list>
            <v-bottom-navigation
                v-model="areaValue"
                :background-color="color"
                dark
                shift
            >
              <v-btn>
                <span>关注的吧</span>
                <v-icon>mdi-television-play</v-icon>
              </v-btn>
              <v-btn>
                <span>我的发帖</span>
                <v-icon>mdi-music-note</v-icon>
              </v-btn>
              <v-btn>
                <span>我的回帖</span>

                <v-icon>mdi-book</v-icon>
              </v-btn>
              <v-btn>
                <span>回复我的</span>
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </v-card>

        </v-col>
      </v-row>
    </v-main>
    <v-dialog max-width="60%" v-model="updateAvatar">
          <v-card class="pa-4">
            <v-form v-model="upload.allow" ref="avatarForm">
              <v-file-input filled v-model="upload.file" accept="image/*"
                            prepend-icon="mdi-image" :rules="imgRule" placeholder="上传你的新头像"
                            @change="changeImg"
              >
              </v-file-input>
              <v-expand-transition>
              <v-img
                  v-show="imgShow"
                  :src="imgShow"
                  max-height="240"
                  contain
                  class="grey lighten-3"
              >
              </v-img>
              </v-expand-transition>
              <v-btn block color="success" @click="submitAvatar">
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
    },
    color () {
      switch (this.areaValue) {
        case 0: return 'blue-grey'
        case 1: return 'teal'
        case 2: return 'brown'
        case 3: return 'indigo'
        default: return 'blue-grey'
      }
    },
  },
  created() {
    console.log(this.user)
  },
  data(){
    return{
      hover: false,
      updateAvatar: false,
      areaValue:1,
      imgRule: [
        v=>{ return (v !== null && v["type"].search("image") != -1) || "请上传图片" },
      ],
      upload:{
        allow: true,
        file: null,
      },
      newName:"testczc2000",
      alert: false,
      imgShow:null,
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
    },
    changeImg(){
      if(!this.upload.file){
        this.imgShow=null
        return
      }
      var file = this.upload.file;
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function() {
        console.log(this.result.slice(0, 20))
        that.imgShow = this.result
      }
    },
    // async updateName(){
    //   let formData = new FormData()
    //   formData.append("name", this.newName)
    //   let res=await axios.post("/api/user/name",formData,{headers:{Authorization:this.$store.state.loginState.token}})
    //   console.log(res)
    // }
  }
}
</script>

<style scoped>
#avatar{
  cursor: pointer;
}
</style>