<template>
  <v-container>
    <v-main>
      <v-row>
        <v-col cols="6" offset="3">
          <v-card>
            <v-list>
              <v-list-item >
                <v-list-item-avatar id="avatar" size="100">
                  <v-img :src="imgUrl" @mouseenter="startHover" @mouseleave="endHover" @click="editAvatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-title v-text="user['userName']"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "UserInfo",
  computed:{
    user(){
      return this.$store.state.userData
    },
    imgUrl(){
      return this.hover ? require('../assets/editAvatar.png') : this.OssUrl + this.user['userAvatar']
    }
  },
  watch:{
    hover(val){
      console.log(val)
    }
  },
  created() {
    console.log(this.user)
  },
  data(){
    return{
      hover: false,
    }
  },
  methods:{
    startHover(){
      this.hover = true
    },
    endHover(){
      this.hover = false
    },
    editAvatar(){
      console.log("editAvatar!")
    }
  }
}
</script>

<style scoped>
#avatar{
  cursor: pointer;
}
</style>