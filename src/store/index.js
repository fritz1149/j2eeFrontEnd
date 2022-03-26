import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

const loginState={
  namespaced: true,
  state:{
    isLogin: false,
    token: null,
    aimBeforeLogin: "/home"
  },
  mutations:{
    changeLoginState(state, nextState){
      state.isLogin = nextState
    },
    saveToken(state, token){
      state.token = token
      window.localStorage.setItem("token",token)
    },
    loadToken(state, token){
      state.token = token
    },
    changeAimBeforeLogin(state, aim){
      state.aimBeforeLogin = aim
    }
  },
  actions:{
    login(context,form){
      return axios.post('/login',null,{
        params:{
          'password':form.password,
          'username':form.username
        }
      }).then(response=>{
        //console.log(response.data)
        if(response.data.status===200){
          context.commit("changeLoginState",true)
          context.commit("saveToken",response.data.Authorization)
          console.log("登录成功")
          return true
        }
        else {
          console.log("登陆失败")
          return false
        }
      })
    },
    // loadToken(context){
    //   let token=window.localStorage.getItem("token")
    //   //console.log("loadToken: "+token)
    //   return axios.get(url,{
    //     headers:{
    //       "Authorization":token
    //     }
    //   }).then(response=>{
    //     //console.log("token: "+token+"\nWhoAmI: "+response.data.WhoAmI.userid)
    //     if(typeof(response.data.WhoAmI)=="object"){
    //       context.commit("loadToken",token)
    //       context.commit("changeLoginState",true)
    //       return true
    //     }
    //     else{
    //       context.commit("changeLoginState",false)
    //       console.log("token failed")
    //       return false
    //     }
    //   })
    // },
    logOut(context){
      return new Promise((resolve)=>{
        context.commit("changeLoginState",false)
        context.commit("saveToken","")
        resolve()
      })
    },
    register(context,form){
      return axios.post("/register",null,{
        params:{
          'password':form.password,
          'username':form.username
        }
      }).then(response=>{
        if(response.data.status===200)
          console.log("注册成功")
        else
          console.log("注册失败")
        return response.data.msg
      })
    }
  }
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginState
  }
})
