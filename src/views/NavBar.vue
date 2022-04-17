<template>
  <v-app-bar class="navbar" dark app>
    <v-btn text value="home" to="/home">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text value="message" v-if="isLogin" @click="$store.commit('message/showMessage')">
      <v-icon>mdi-message</v-icon>
      <span>Message</span>
      <v-badge color="red" :content="unread" v-if="unread"></v-badge>
    </v-btn>
    <v-btn text value="login" to="/login" v-if="!isLogin">
      <v-icon>mdi-login</v-icon>
      <span>Login</span>
    </v-btn>
    <v-menu v-else offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar title>
            <v-img :src="OssUrl+avatar" v-if="avatar" alt="我的图图呢"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push('/userInfo')">
          个人信息
        </v-list-item>
        <v-list-item @click="logout">
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
    },
    avatar(){
      return this.$store.state.userData.userAvatar;
    },
    unread(){
      return this.$store.state.message.unread;
    }
  },
  created() {
    // console.log(this.isLogin)
  },
  methods:{
    test(){
      console.log('qwq')
    },
    logout(){
      let vm = this
      console.log("logout")
      this.$store.dispatch('loginState/logOut')
      .then(()=>{
        if(vm.$route.path == '/userInfo')
          vm.$router.push("/home")
        else
          vm.$router.push("/refresh")
      })
    }
  }
}
</script>

<style scoped>
.navbar-btn-right{
  position: relative;
  float: right;
}
</style>