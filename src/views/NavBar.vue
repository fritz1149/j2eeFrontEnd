<template>
  <v-app-bar
      app
      color="white"
      flat
      rounded
      class="navBar"
  >
    <v-container class="py-0 fill-height">
      <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
      ></v-avatar>

      <v-btn
          v-for="(link,index) in links"
          :key="link"
          text
          x-large
          @click="go(index)"
      >
        {{ link }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    links: [
      '首页',
      '个人空间',
      '消息',
      '登出',
    ],
  }),
  methods:{
    go(index){
      console.log(index)
    }
  }
}
</script>

<style scoped>
.navBar{
  font-size: 20px;
  font-family: "微软雅黑";
}
</style>