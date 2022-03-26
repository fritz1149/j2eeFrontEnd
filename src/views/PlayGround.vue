<template>
  <v-list>
    <section-preview v-for="s in sections" :key="s.sectionId" :section-avatar="s.avatarUrl" :section-description="s.description" :section-name="s.name"></section-preview>

  </v-list>
</template>

<script>
//这里只是用来测试组件效果的play ground
import SectionPreview from "@/components/SectionPreview";
import axios from "axios";
export default {
  name: "PlayGround",
  data:function (){
    return {
      sections:[]
    }
  },
  components: {SectionPreview},
  created() {
    axios.get('/api/section/',{
      params:{
        pageNum:1,
        pageSize:10
      }
    }).then((res)=>{
      this.sections=res.data.data.list
    })
  }
}
</script>

<style scoped>

</style>
