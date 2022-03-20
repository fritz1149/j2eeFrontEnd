<template>
  <v-app-bar fixed v-model="partSelect">
    <v-btn text value="true" to="/home" absolute>
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-btn text value="true" absolute right>
      <v-icon>mdi-login</v-icon>
      <span>Login</span>
    </v-btn>
<!--    <Login :display="partSelect == 'login'"></Login>-->
  </v-app-bar>
</template>

<script>
// import Login from "@/views/Login";
export default {
  name: "NavBar",
  // components: {Login},
  watch:{
    partSelect: (val, oldVal) => {
      console.log(val + " " + oldVal)
    }
  },
  data: function (){
    return{
      partSelect: "home"
    }
  }
}
</script>

<style scoped>
</style>