<template>
<div>
  <v-container >
    <v-row no-gutters >
      <v-col cols="2">
        <v-card height="200">
          <v-list-item>
            <v-list-item-avatar height="150" width="150"><v-img :src="this.OssUrl+reply.sender.userAvatar"></v-img></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card height="200">
          <v-list-item three-line>
              {{reply.content}}
              <v-img v-if="'picUrl' in reply" :src="this.OssUrl+reply.picUrl" max-height="100" :aspect-ratio="1/1"></v-img>
            <v-col cols="2" align-self="right">{{reply.sendTime}}</v-col>
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
    reply: Object,
  }
}
</script>

<style scoped>

</style>
