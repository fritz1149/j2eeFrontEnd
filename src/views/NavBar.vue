<template>
  <v-app-bar fixed>
    <v-btn text value="home" to="home" absolute depressed @click="changePart('home')">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-btn text value="login" to="login" absolute right @click="changePart('login')">
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
      console.log(val == 'login')
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
</style>