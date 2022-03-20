<template>
  <div>
    <NavBar></NavBar>
    <br/><br/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/views/NavBar";
export default {
  name: 'App',
  components: {NavBar},
  data: () => ({
    //
  }),
};
</script>
