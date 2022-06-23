<template>
  <v-card>
    <v-toolbar
        color="indigo"
        dark
    >
      <v-toolbar-title>新建贴吧</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="section.allow" ref="sectionForm" class="pa-4">
      <v-text-field filled v-model="section.title"
                    label="吧名"
                    placeholder="输入新吧的名字"
                    :counter="titleMax" :rules="titleRule"
      ></v-text-field>
      <v-textarea filled v-model="section.text"
                  label="描述"
                  placeholder="输入新吧的描述"
                    :counter="textMax" :rules="textRule"
      ></v-textarea>
      <v-file-input filled v-model="section.file" accept="image/*"
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
      <v-btn @click="submitSection" color="success" block>
        <v-icon>mdi-comment-check</v-icon>
        提交
      </v-btn>
    </v-form>
  </v-card>

</template>

<script>
import axios from "axios";

export default {
  name: "AddNewSection",
  // props:['section'],
  data:function () {
    return{
      section: {
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
      if(!this.section.file){
        this.imgShow=null
        return
      }
      var file = this.section.file;
      console.log(file)
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function() {
        console.log(this.result.slice(0, 20))
        that.imgShow = this.result
      }
    },
    submitSection(){
      let vm = this
      if(this.$refs["sectionForm"].validate()) {
        let formData = new FormData()
        formData.append("name", vm.section["title"])
        formData.append("description", vm.section["text"])
        formData.append("file", vm.section["file"])
        axios.post("/api/section/create", formData, {
          headers:{
            Authorization: vm.$store.state.loginState.token
          }
        }).then(res=>{
          if(res["status"] === 200 && res["data"]["status"] === 200) {
            vm.$router.push("/refresh")
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>