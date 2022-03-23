<template>
  <v-main>
    <v-container>
      <v-row>
        <p>id: {{id}}</p>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Post",
  data: function (){
    return{
      id: null,
      post: null
    }
  },
  created() {
    this.post = this.$route.params["post"]
    console.log(this.post)
    this.id = this.post["postId"]
  }
}
</script>

<style scoped>

</style>