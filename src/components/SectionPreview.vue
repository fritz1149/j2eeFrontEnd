<template>
<div>
  <v-container>
    <v-list-item>
      <v-list-item-avatar><v-img :src="this.OssUrl+this.sectionAvatar"></v-img></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="sectionName"></v-list-item-title>
        <v-list-item-subtitle v-text="sectionDescription"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-container>
</div>
</template>

<script>
export default {
  name: "SectionPreview",
  props:{
    sectionID:Number,
    sectionName:String,
    sectionAvatar:String,
    sectionDescription:String,
    sectionAdmin:Object,
    sectionBornTime:String
  },
  data:function () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
