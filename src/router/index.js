import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginWithRegister from "../views/LoginWithRegister";
import Post from "@/views/Post";
import PlayGround from "@/views/PlayGround";
import Section from "@/views/Section";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    alias: '/home'
  },
  {
    path:'/login',
    component: LoginWithRegister
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
    props: true,
  },
  {
    path: '/section/:id',
    name: 'section',
    component: Section,
    props: true,
  },
  {
    path:'/test',
    name:'test',
    component: PlayGround,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import store from "../store/index.js"
router.beforeEach((to, from, next) => {
  store.dispatch("loginState/loadToken").then(res => {
    //console.log("res= "+res)
    if (res)
      store.commit("userData/loadUserData")
  }).finally(() => {
    // store.commit("common/clearSearchInput")
    // if (to.meta.login && !store.state.loginState.isLogin) {
    //   Message.warning("不登陆是不行的 ( ͡° ͜ʖ ͡°)")
    //   store.commit("loginState/changeAimBeforeLogin",to.path)
    //   next('/logintest')
    // }
    // else if(to.meta.notLogin && store.state.loginState.isLogin){
    //   Message.warning("已经登陆了")
    //   next('/home')
    // }
    // else next();
    next()
  })

})

export default router
