<template>
  <v-dialog v-model="display" @click:outside="$emit('update:display', false)">
    <v-card>
      <p>hello message</p>
    </v-card>
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