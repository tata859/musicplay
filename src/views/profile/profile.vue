<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">注册</mt-tab-item>
      <mt-tab-item id="2">登录</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="form">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
          <mt-field label="新密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model="password"></mt-field>
          <div class="btn">
            <mt-button type="primary" class="loginBtn" @click = "register">注册</mt-button>
            <mt-button type="primary">重置</mt-button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="form">
          <mt-field label="用户名" placeholder="请输入用户名" value="username" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" value="password" v-model="password"></mt-field>
          <div class="btn">
            <mt-button type="primary" class="loginBtn" @click = "login">登录</mt-button>
            <mt-button type="primary">重置</mt-button>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>

<script>
  import axios from "axios"
  import { Toast } from 'mint-ui';

  export default {
    name: "profile",
    data(){
      return {
        username:"",
        email:"",
        password:"",
        selected:"1",

      }
    },
    methods:{
      register(){
        axios({
          method:"POST",
          url:'http://118.89.195.61:5555/register',
          data:{
            name:this.username,
            passworld:this.password,
            Email:'851194516@qq.com'
          },
        }).then((res)=>{
          console.log(res);
          Toast({
            message:res.data.msg
          })
          if(res.data.code===1){

            this.$router.replace("/musichall")
          }
        })

      },
      login(){},
    },
  }
</script>

<style scoped>
  .btn{
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .loginBtn{
    margin-right: 10px;
  }
</style>