<template>
  <v-dialog v-model="display">
    <p>hello world</p>
  </v-dialog>
</template>

<script>
export default {
  name: "Message",
  props:["display"],
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>