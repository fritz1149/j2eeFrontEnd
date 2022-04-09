<template>
  <v-card>
    <v-form v-model="message.allow" ref="postForm">
      <v-textarea v-model="message.text"
                  filled
                  :counter="textMax" :rules="textRule"
      ></v-textarea>
      <v-file-input v-model="message.file" accept="image/*"
                    filled
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
        <v-icon>mdi-check</v-icon>
        发送
      </v-btn>
    </v-form>
  </v-card>

</template>

<script>
import axios from "axios";

export default {
  name: "AddNewMessage",
  props:['contactId'],
  watch:{
    contactId(){
      this.clear()
    }
  },
  data:function () {
    return{
      message: {
        allow: true,
        text: '',
        file: null,
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
      imgShow:null
    }
  },
  methods:{
    changeImg(){
      if(!this.message.file){
        this.imgShow=null
        return
      }
      var file = this.message.file;
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
        formData.append("content", vm.message["text"])
        formData.append("receiverId", vm.contactId)
        formData.append("file", vm.message["file"])
        axios.post("/api/message/send", formData, {
          headers:{
            Authorization: vm.$store.state.loginState.token
          }
        }).then(res=>{
          console.log(res)
          if(res["status"] === 200 && res["data"]["status"] === 200) {
            vm.$emit("send", res["data"]["data"])
            this.clear()
          }
          else{
            vm.$emit("sendFailed")
          }
        })
      }
    },
    clear(){
      this.message.text = ''
      this.message.file = null
      this.imgShow = null
      this.$refs["postForm"].resetValidation();
    }
  }
}
</script>

<style scoped>

</style>