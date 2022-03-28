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
    loadToken(context){
      return new Promise(resolve=>{
        if(context.state.token)
          resolve(true)
        let token=window.localStorage.getItem("token")
        if(token) {
          context.commit("loadToken", token)
          context.commit("changeLoginState", true)
          resolve(true)
        }
        resolve(false)
      })
    },
    logOut(context){
      return new Promise((resolve)=>{
        context.commit("changeLoginState",false)
        context.commit("saveToken","")
        resolve()
      })
    }
  }
}

const userData={
  namespaced: true,
  state:{
    userName: null,
    userId: null,
    userAvatar: null
  },
  mutations:{
    saveUserData(state,data){
      state.userName=data["userName"]
      state.userId=data["userId"]
      state.userAvatar=data["userAvatar"]
      window.localStorage.setItem("userdata",JSON.stringify(data))
    },
    loadUserData(state){
      let data=JSON.parse(window.localStorage.getItem("userdata"))
      state.userName=data["userName"]
      state.userId=data["userId"]
      state.userAvatar=data["userAvatar"]
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
    loginState, userData
  }
})
