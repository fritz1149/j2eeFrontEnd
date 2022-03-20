<template>
  <v-app-bar>
    <v-btn text value="home" to="home" @click="changePart('home')">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text value="message">
      <v-icon>mdi-message</v-icon>
      <span>Message</span>
    </v-btn>
    <v-btn text value="login" to="login" @click="changePart('login')">
      <v-icon>mdi-login</v-icon>
      <span>Login</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: function (){
    return{
      partSelect: "home"
    }
  },
  watch:{
    partSelect: (val, oldVal) => {
      console.log(val + " " + oldVal)
    }
  },
  methods:{
    changePart(part){
      this.partSelect = part;
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