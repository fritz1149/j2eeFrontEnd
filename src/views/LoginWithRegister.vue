<template>
  <div id="loginform1">
    <div class="container" :class="{'right-panel-active':right_active}" id="container">
      <div class="form-container sign-up-container">
        <form>
          <v-form>
          <h1>创建账号</h1>
          <v-row no-gutters>
            <v-col
                md="9"
                style="margin-left: 14%"
            >
              <v-text-field
                  v-model="Register.userName"
                  label="用户名"
                  placeholder="请输入用户名"
                  clearable
                  color="primary"
                  prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
                md="9"
                style="margin-left: 14%"
            >
              <v-text-field
                  v-model="Register.password"
                  label="密码"
                  type="password"

                  placeholder="请输入密码"
                  clearable
                  color="primary"
                  prepend-icon="mdi-lock"
                  :rules="passwordRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
                md="9"
                style="margin-left: 14%"
            >
              <v-text-field

                  v-model="Register.repeatPassword"
                  label="确认密码"
                  type="password"
                  placeholder="请确认密码"
                  clearable
                  color="primary"
                  prepend-icon="mdi-lock"
                  :rules="confirmPasswordRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <button class="realButton" type="button" v-on:click="doRegister">注册</button>
          </v-form>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form>
          <v-form>
            <h1>登录</h1>
            <v-row no-gutters>
              <v-col
                  md="9"
                  style="margin-left: 14%"
              >
                <v-text-field
                    v-model="Login.userName"
                    label="用户名"
                    placeholder="请输入用户名"
                    clearable
                    color="primary"
                    prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                  md="9"
                  style="margin-left: 14%"
              >
                <v-text-field
                    v-model="Login.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    clearable
                    color="primary"
                    prepend-icon="mdi-lock"
                ></v-text-field>
              </v-col>
            </v-row>
            <button class="realButton" type="button" v-on:click="doLogin">登录</button>
          </v-form>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 style="color: white">欢迎回来</h1>
            <p style="color: white;font-weight: bold">欢迎回到xxx论坛，登录以进行发帖和回复</p>
            <button class="ghost realButton" id="signIn" @click="right_active=false">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 style="color: white">你好,朋友</h1>
            <p style="color: white;font-weight: bold">如果你还没有账号，请先注册账号</p>
            <button type="button" class="ghost realButton" id="signUp" @click="right_active=true">注册</button>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar top="top"
        v-model="snackbar"
    >
      {{ notification }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default{
  name:"login",
  data(){
    return{
      right_active:false,
      snackbar: false,
      notification:null,
      Login:{
        userName:"",
        password:"",
      },
      Register:{
        userName:"",
        password:"",
        repeatPassword:"",
      },
      passwordRules:[
          v=>!!v||'请填写密码',
          v=>v.length>=8||'密码过短'
      ],
      confirmPasswordRules:[
          v=>!!v||'密码不能为空',
          v=>v===this.Register.password||'两次密码不一致'
      ]
    }
  },
  methods:{
    doLogin:function () {
      axios.post(this.baseUrl+'/login',{
        username:this.$data.Login.userName,
        password:this.$data.Login.password
      }).then((res)=>{
        console.log(res)
        if(res.data.code===200){
          this.$store.commit('loginState/saveToken',res.data.Authorization);
          this.$store.commit('loginState/changeLoginState',true);
          this.$data.notification='欢迎回来我的朋友'
          this.$data.snackbar=true
          this.$router.push('/')
        }else{
          this.$data.notification='用户名或密码错误'
          this.$data.snackbar=true
        }
      },(err)=>{
        console.log(err)
        this.$data.notification='服务器开小差了'
        this.$data.snackbar=true
      })
    },
    doRegister:function () {
        axios.post(this.baseUrl+'/register',{
          username:this.Register.userName,
          password:this.Register.password
        }).then((res)=>{
          if(res.data.status===200){
            this.$router.push('/')
          }
        })
    }
  },
  mounted(){
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed:{
  }
}
</script>
<style lang="less">
#loginform1 {
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: calc(100vh);
  margin: -20px 0 50px;
  h1 {
    font-weight: bold;
    margin: 0;
  }

  h2 {
    text-align: center;
  }

  p {
    font-size: 18px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .realButton {
    cursor: pointer;
    border-radius: 30px;
    border: 1px solid rgb(69, 103, 128);
    background-color: rgb(69, 103, 128);
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    padding: 16px 60px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: white;
    border:2px solid rgb(69, 103, 128);
    color: rgb(69, 103, 128);
  }

  .sign-up-container  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .v-form{
      width: 100%;
      margin-bottom: 25px;
      .row.no-gutters{
        width: 100%;
      }
      h1{
        margin-top: 50px;
        margin-bottom: 25px;
      }
    }
  }
  .sign-in-container  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .v-form{
      margin-bottom: 50px;
      width: 100%;
      .row.no-gutters{
        width: 100%;
      }
      h1{
        margin-top: 50px;
        margin-bottom: 50px;
      }
    }

  }


  .container {
    background-color: rgba(255,255,255,0.07);
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(255,255,255,0.25),
    0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 900px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container{
    transform: translateX(-100%);
  }

  .overlay {
    background: #FF416C;
    background-color: rgba(255,255,255,0);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #000000;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    color: white;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 0;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
  }

  footer p {
    margin: 10px 0;
  }

  footer i {
    color: red;
  }

  footer a {
    color: #3c97bf;
    text-decoration: none;
  }
}
</style>
