<template>
<div>
  <v-main>
    <v-container>
      <v-row v-for="n in 3" :key="n">
        <v-col cols="4" v-for="j in 3" :key="3*(n-1)+j-1">
          <v-card outlined="outlined" v-if="3*(n-1)+j-1<self.subData.total">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ self.subData.list[3*(n-1)+j-1].name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ subData.list[3*(n-1)+j-1].description }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  size="80"
              >
                <v-img :src="self.OssUrl+subData.list[3*(n-1)+j-1].avatarUrl"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions v-if="3*(n-1)+j-1<self.subData.total">
              <v-btn
                  outlined
                  rounded
                  text
                  @click="unSubscribe(subData.list[3*(n-1)+j-1].sectionId)"
              >
                取消关注
              </v-btn>
              &nbsp;&nbsp;&nbsp;总关注人数&nbsp;{{subData.list[3*(n-1)+j-1].subscribeNum}}
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SubScribePage",
  data:function (){
    return {
        pageNum:1,
      pageSize:10,
      subData:null,
      self:this
    }
  },methods:{
    getSub(){
      axios.get('/api/section/sub',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize
        },
        headers:{
          Authorization:this.$store.state.loginState.token
        }
      },).then((res)=>{
        this.subData=res.data.data;
        console.log("订阅信息")
        console.log(this.subData)
      })
    },
    unSubscribe(sectionID){
      axios.post('/api/section/subscribe',null,{
        params:{
          id:sectionID
        },headers:{
          Authorization:this.$store.state.loginState.token
        }
      }).then(()=>{
        this.$router.push('/refresh')
      })
    }
  },
  created() {
    this.getSub();
  }
}
</script>

<style scoped>

</style>
