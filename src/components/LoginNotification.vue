<template>
  <v-snackbar v-model="display" top>
    {{notification}}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="green"
          text
          v-bind="attrs"
          to="/login">
        Log In
      </v-btn>
      <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="$emit('update:display', false)"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "LoginNotification",
  props:["notification", "display"]
}
</script>

<style scoped>

</style>