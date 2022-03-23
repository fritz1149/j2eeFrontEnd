<template>
<div>
  <v-container>
    <v-row no-gutters>
      <v-col cols="4">
        <v-card height="auto">
          <v-list-item>
            <v-list-item-avatar><v-img :src="this.OssUrl+reply.sender.userAvatar"></v-img></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card height="auto">
          <v-list-item>
            <v-list-item-content >
              {{reply.content}}
              <v-img :src="this.OssUrl+reply.picUrl"></v-img>
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
    reply: Object,
  }
}
</script>

<style scoped>

</style>
