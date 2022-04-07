<template>
  <v-card>
    <v-toolbar
        color="indigo"
        dark
    >
      <v-toolbar-title>发送帖子</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="post.allow" ref="postForm">
      <v-text-field filled v-model="post.title"
                    label="标题"
                    placeholder="输入你的标题"
                    :counter="titleMax" :rules="titleRule"
      ></v-text-field>
      <v-textarea filled v-model="post.text"
                  label="回复"
                  placeholder="输入你的回复"
                    :counter="textMax" :rules="textRule"
      ></v-textarea>
      <v-file-input filled v-model="post.file" accept="image/*"
                    prepend-icon="mdi-image" :rules="imgRule"
                    @change="changeImg"
      ></v-file-input>
      <v-expand-transition>
      <v-img
          v-show="imgShow"
          :src="imgShow"
          max-height="240"
          contain
          class="grey lighten-3"
      ></v-img>
      </v-expand-transition>
      <v-btn @click="submitPost" color="success" block>
        <v-icon>mdi-comment-check</v-icon>
        提交
      </v-btn>
    </v-form>
  </v-card>

</template>

<script>
import axios from "axios";

export default {
  name: "AddNewPost",
  props:['section'],
  data:function () {
    return{
      post: {
        allow: true,
        title: '',
        text: '',
        file: null
      },
      textMax: 100,
      titleMax: 10,
      imgRule: [
        v=>{ return v === null || v["type"].search("image") !== -1 || "只能上传图片" },
      ],
      textRule: [
        v=>{ return v.length <= this.textMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ],
      titleRule:[
        v=>{ return v.length <= this.titleMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ],
      imgShow:null
    }
  },
  methods:{
    changeImg(){
      if(!this.post.file){
        this.imgShow=null
        return
      }
      var file = this.post.file;
      console.log(file)
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function() {
        console.log(this.result.slice(0, 20))
        that.imgShow = this.result
      }
    },
    submitPost(){
      let vm = this
      if(this.$refs["postForm"].validate()) {
        let formData = new FormData()
        formData.append("title", vm.post["title"])
        formData.append("content", vm.post["text"])
        formData.append("section", vm.section["sectionId"])
        console.log(vm.section["sectionId"])
        formData.append("pic", vm.post["file"])
        axios.post("/api/post/add", formData, {
          headers:{
            Authorization: vm.$store.state.loginState.token
          }
        }).then(res=>{
          if(res["status"] === 200 && res["data"]["status"] === 200) {
            vm.$router.push("/refresh")
          }
          else{
            vm.$emit("addPostError")
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>