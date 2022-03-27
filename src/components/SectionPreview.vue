<template>
<div>
  <v-container>
    <v-list-item>
      <v-list-item-avatar><v-img :src="this.OssUrl+this.sectionAvatar"></v-img></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="sectionName"></v-list-item-title>
        <v-list-item-subtitle v-text="sectionDescription"></v-list-item-subtitle>
      </v-list-item-content >
      <v-list-item-action >
          <v-btn tile outlined @click="subscribe">
            <v-icon>mdi-eye-plus</v-icon>{{subscribe_btn_text}}
          </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-container>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SectionPreview",
  props:{
    sectionId:Number,
    sectionName:String,
    sectionAvatar:String,
    sectionDescription:String,
    sectionAdmin:Object,
    sectionBornTime:String,
    subscription:Boolean,
  },
  computed:{
    subscribe_btn_text(){
      return this.subscription ? '取关' : '关注';
    }
  },
  data:function () {
    return {

    }
  },
  methods:{
    subscribe(){
      if(this.$store.state.loginState.isLogin){
        axios.post('/api/section/subscribe', null,{
          params:{id: this.sectionId},
          headers:{Authorization: this.$store.state.loginState.token}
        }).then(res=>{
          if(res["status"] == 200 && (res['data']["status"] == 200 || res['data']["status"] == 201)){
            this.$emit('update:subscription', !this.subscription)
            console.log(res["data"]["status"])
          }
          console.log(res)
        })
      }
      else{
        this.$emit('notLogged')
        console.log("not logged in")
      }
    }
  }
}
</script>

<style scoped>
</style>
