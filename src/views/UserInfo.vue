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
                <span style="font-weight: bold;font-size: 20px" v-text="user['userName']">
                </span>
                <v-btn plain color="primary" @click="editName=true"><v-icon>mdi-credit-card-edit</v-icon></v-btn>

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
                <span>我的关注</span>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn>
                <span>我的发帖</span>
                <v-icon>mdi-post</v-icon>
              </v-btn>
              <v-btn>
                <span>我的回帖</span>
                <v-icon>mdi-chat-processing</v-icon>
              </v-btn>
              <v-btn>
                <span>回复我的</span>
                <v-icon>mdi-reply</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </v-card>

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8" offset="2">
          <v-expand-transition>
          <v-card v-show="areaValue==0">
            <v-toolbar
                :color="color"
                dark
            >
              <v-toolbar-title>我的关注</v-toolbar-title>
            </v-toolbar>
            <SubScribePage></SubScribePage>
          </v-card>
          </v-expand-transition>

          <v-expand-transition>
          <v-card v-show="areaValue==1">

            <v-toolbar
                :color="color"
                dark
            >
              <v-toolbar-title>我的发帖</v-toolbar-title>
            </v-toolbar>
            <MyPostPage></MyPostPage>
          </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="areaValue==2">
              <v-toolbar
                  :color="color"
                  dark
                  style="margin-bottom: 30px"
              >
                <v-toolbar-title>我的回帖</v-toolbar-title>
              </v-toolbar>
              <MyReplyPage></MyReplyPage>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
          <v-card v-show="areaValue==3">
            <v-toolbar
                :color="color"
                dark
                style="margin-bottom: 30px"
            >
              <v-toolbar-title>回复我的</v-toolbar-title>
            </v-toolbar>
            <ReplyToMePage></ReplyToMePage>
          </v-card>
          </v-expand-transition>


        </v-col>
      </v-row>
    </v-main>



    <v-dialog max-width="60%" v-model="updateAvatar">

          <v-card>
            <v-toolbar
                color="indigo"
                dark
            >
              <v-toolbar-title>更换头像</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-form class="pa-4" v-model="upload.allow" ref="avatarForm">
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

    <v-dialog max-width="60%" v-model="editName">
        <v-card>
          <v-toolbar
              color="warning"
              dark
          >
            <v-toolbar-title>更换用户名 <span style="font-weight: bold">(请记住你的用户名，这将用于登录)</span> </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form class="pa-4" ref="nameForm">
            <v-text-field filled v-model="newName"
                          label="名字"
                          :placeholder="user['username']" :rules="nameRule"
            ></v-text-field>
            <v-btn @click="updateName" color="success" block>
              <v-icon>mdi-comment-check</v-icon>
              提交
            </v-btn>
          </v-form>
        </v-card>

      <v-snackbar v-model="display" top>
        {{notification}}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="display=false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-dialog>




  </v-container>
</template>

<script>
import axios from "axios";
import SubScribePage from "@/views/SubScribePage";
import MyPostPage from "@/views/MyPostPage";
import MyReplyPage from "@/views/MyReplyPage";
import ReplyToMePage from "@/views/ReplyToMePage";
export default {
  name: "UserInfo",
  components:{
    SubScribePage,
    MyPostPage,
    MyReplyPage,
    ReplyToMePage
  },
  computed:{
    user(){
      return this.$store.state.userData
    },
    imgUrl(){
      return this.hover ? require('../assets/updateAvatar.png') : this.OssUrl + this.user['userAvatar']
    },
    color () {
      switch (this.areaValue) {
        case 0: return 'indigo'
        case 1: return 'teal'
        case 2: return 'cyan darken-2'
        case 3: return 'purple darken-2'
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
      nameMax:100,
      nameRule:[
        v=>{ return v.length <= this.nameMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ],
      upload:{
        allow: true,
        file: null,
      },
      newName:"",
      alert: false,
      imgShow:null,
      editName:false,
      display:false,
      notification:"",
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
    async updateName(){
      if(this.$refs["nameForm"].validate()){
        let formData = new FormData()
        formData.append("name", this.newName)
        let res=await axios.post("/api/user/name",formData,{headers:{Authorization:this.$store.state.loginState.token}})
        if(res.data.status==200){
          let newInfo = Object.create(this.$store.state.userData)
          newInfo.userName = res["data"]["newname"]
          this.$store.commit("userData/saveUserData", newInfo)
          this.$router.push("/refresh")
        }else{
          this.notification=res.data.cause
          this.display=true
        }
      }
    }


  }
}
</script>

<style scoped>
#avatar{
  cursor: pointer;
}
</style>