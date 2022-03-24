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

export default router
