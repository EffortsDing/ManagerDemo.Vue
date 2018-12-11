<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from "../api/api";
import qs from "qs";
import Axios from "axios";
import { valid } from 'semver';
import _cookie from '../common/js/cookie'
export default {
  name: "LogIn",
  data() {
    return {
      checked: true,
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    handleLogin() {
      this.$refs.ruleForm2.validate((valid)=> {
        if (valid){
          this.logining = true
          var loginParams = {
            IsRem: this.checked,
            PASSWORD: this.ruleForm2.checkPass,
            USER_ID: this.ruleForm2.account
          };
          // 调用axios登陆接口
          login(loginParams)
            .then(res => {
             this.logining =false
             let { code, message, user} = res.data
             console.log(res.data)
             debugger
             if (code === 200) {
               this.$message({
                type: 'success',
                message: message
              });
              // 登陆成功，用户信息就保存在sessionStorage中
              sessionStorage.setItem('user', JSON.stringify(user));
              //判断复选框是否选中
              var remeberFlag
              if (this.checked == true) {
                remeberFlag = 'true'
              }
              else{
                remeberFlag ='false'
              }
              // 调用配置cookie方法,参数账号，密码，保存天数
              _cookie.setCookie(this.ruleForm2.account, this.ruleForm2.checkPass, 7, remeberFlag)
              // 跳转到后台主页面
              this.$router.push({path: '/table'})
             }
             else{
               this.$message({
                type: 'error',
                message: message,
              });
             }
            })
            .catch(function(err) {
              console.log(err);
            });
            }else {
              console.log('error submit!');
              return false;
            }
          })
    },

    setCookie(c_name, c_pwd, exdays, remeberFlag) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "remeberFlag" +
        "=" +
        remeberFlag +
        ";path=/;expires=" +
        exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm2.checkPass = arr2[1];
          }
        }
      }
    }
  }
};
</script>

<style>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
  float: left;
}
</style>