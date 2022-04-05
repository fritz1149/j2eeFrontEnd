<template>
  <v-card>
    <v-form v-model="post.allow" ref="postForm">
      <v-file-input v-model="post.file" accept="image/*"
                    prepend-icon="mdi-image" :rules="imgRule"
      ></v-file-input>
      <v-text-field v-model="post.title" placeholder="输入你的标题"
                    :counter="titleMax" :rules="titleRule"
      ></v-text-field>
      <v-text-field v-model="post.text" placeholder="输入你的回复"
                    :counter="textMax" :rules="textRule"
      ></v-text-field>
      <v-btn @click="submitPost">
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
        v=>{ return v === null || v["type"].search("image") != -1 || "只能上传图片" },
      ],
      textRule: [
        v=>{ return v.length <= this.textMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ],
      titleRule:[
        v=>{ return v.length <= this.titleMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ]
    }
  },
  methods:{
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
          if(res["status"] == 200 && res["data"]["status"] == 200) {
            vm.$router.push("/refresh")
          }
          else{
            this.alert = true
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>