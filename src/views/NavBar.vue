<template>
  <v-app-bar class="navbar" dark app>
    <v-btn text value="home" to="/home">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text value="message">
      <v-icon>mdi-message</v-icon>
      <span>Message</span>
    </v-btn>
    <v-btn text value="login" to="/login" v-if="!isLogin">
      <v-icon>mdi-login</v-icon>
      <span>Login</span>
    </v-btn>
    <v-menu v-else offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar title>
            <v-img :src="OssUrl+'defaultAvatar.png'"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$store.dispatch('loginState/logOut')">
          登出
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: function (){
    return{
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.loginState.isLogin;
    }
  },
  created() {
    console.log(this.isLogin)
  },
  methods:{
  }
}
</script>

<style scoped>
.navbar-btn-right{
  position: relative;
  float: right;
}
</style>