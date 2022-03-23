<template>
<div>
  <v-container>
    <v-row no-gutters>
      <v-col cols="4">
        <v-card height="auto">
          <v-list-item>
            <v-list-item-avatar><v-img :src="this.OssUrl+this.sender.userAvatar"></v-img></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card height="auto">
          <v-list-item>
            <v-list-item-content >
              {{this.content}}
              <v-img :src="this.OssUrl+this.picUrl"></v-img>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  name: "Reply",
  props:{
    isDataReady:Boolean,
    replyId:Number,
    content:String,
    sendTime:String,
    sender:Object,
    picUrl:String
  }
}
</script>

<style scoped>

</style>
