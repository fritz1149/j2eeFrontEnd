<template>
  <v-card>
    <v-toolbar
        color="indigo"
        dark
    >
      <v-toolbar-title>添加回复</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="reply.allow" ref="replyForm">
      <v-textarea
          filled
          name="input-7-4"
          label="回复内容"
          placeholder="输入你的回复"
          v-model="reply.text"
          :counter="textMax" :rules="textRule"
      ></v-textarea>

      <v-file-input
          filled
          v-model="reply.file" accept="image/*"
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
      <v-btn @click="submitReply" block color="success">
        <v-icon>mdi-comment-check</v-icon>
        提交
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "AddNewReply",
  props:['id'],
  data:function (){
    return{
      reply: {
        allow: true,
        text: '',
        file: null,
      },
      textMax: 100,
      imgRule: [
        v=>{ return v === null || v["type"].search("image") !== -1 || "只能上传图片" },
      ],
      textRule: [
        v=>{ return v.length <= this.textMax || "字数太多啦" },
        v=>{ return v.length > 0 || '不能什么都不写哦'}
      ],
      imgShow:null,
    }
  },
  methods:{
    changeImg(){
      if(!this.reply.file){
        this.imgShow=null
        return
      }
      var file = this.reply.file;
      console.log(file)
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function() {
        console.log(this.result)
        that.imgShow = this.result
      }
    },
    submitReply(){
      let vm = this
      if(this.$refs["replyForm"].validate()) {
        let formData = new FormData()
        formData.append("content", vm.reply["text"])
        formData.append("postId", vm.id)
        formData.append("file", vm.reply["file"])
        axios.post("/api/reply/send", formData, {
          headers:{
            Authorization: vm.$store.state.loginState.token
          }
        }).then(res=>{
          if(res["status"] === 200 && res["data"]["status"] === 200) {
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