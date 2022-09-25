<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <!-- 标题 -->
      <div class="title-container">
        <!-- <h3 class="title">Login Form</h3> -->
        <h3 class="title">
          <img src="@/assets/common/logo.png" alt="">
        </h3>
      </div>
      <!-- 账号框 -->
      <el-form-item prop="loginName">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class="el-icon-mobile-phone" />
        </span>
        <el-input
          v-model="loginForm.loginName"
          placeholder="请输入账号"
        />
      </el-form-item>
      <!-- 密码框 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="password" /> -->
          <i class="el-icon-lock" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码框 -->
      <el-row>
        <el-col :span="17">
          <el-form-item prop="code">
            <span class="svg-container">
              <!-- <svg-icon icon-class="user" /> -->
              <i class="el-icon-check" />
            </span>
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7"><img :src="codeImg" alt="" @click="imageCode"></el-col>
      </el-row>
      <!--  -->
      <!-- 点击登陆的按钮 -->
      <el-button
        class="loginBtn"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="login"
      >登陆</el-button>

    </el-form>
  </div>
</template>

<script>
import { imageCodeAPI } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      // 表单校验在from用
      loginForm: {
        // 账号
        // username: 'admin',
        loginName: 'admin',
        // 密码
        password: 'admin',
        // 验证码
        code: '',
        // 后台字段
        loginType: 0,
        //  随机数
        clientToken: ''
      },
      // 校验规则在from用
      loginRules: {
        loginName: [{ required: true, message: '手机号必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码必填', trigger: 'blur' }]
      },
      // loading按钮的旋转功能
      loading: false,
      // 定义一个数据来判断是否是密码框来显示文字
      passwordType: 'password',
      // redirect: undefined
      // 图片的地址
      codeImg: ''

    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    this.imageCode()
  },
  methods: {

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        // 获取焦点
        this.$refs.password.focus()
      })
    },
    // handleLogin() {
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       this.loading = true
    //       this.$store.dispatch('user/login', this.loginForm).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //         this.loading = false
    //       }).catch(() => {
    //         this.loading = false
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }

    // 给图片一个点击事件
    randomString() { return Math.random().toString(36).slice(2, 6) },
    // 图片验证码
    async imageCode() {
      this.loginForm.clientToken = this.randomString()
      // console.log(m)
      const res = await imageCodeAPI(this.loginForm.clientToken)
      // console.log(res)
      this.codeImg = res.request.responseURL
    },

    // 发请求
    async login() {
      try {
        // 表单验证通过
        await this.$refs.loginForm.validate()
        this.loading = true
        //  接口请求
        // await this.$store.dispatch('user/loginAction', this.loginForm)
        // 调用vuex的请求函数
        // 发请求在vuex中
        await this.$store.dispatch('user/loginAction', this.loginForm)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#999;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  // background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .loginBtn {
    // background: #407ffe;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    height: 51px;
    line-height: 32px;
    font-size: 14px;
    width:100%;
    margin-bottom:30px;
    border: none;
    color: #fff;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;

$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;

    //  加
 .el-form-item {
    border: 1px solid #e2e2e2;
    background:#fff;
    border-radius: 5px;
    color: #454545;
    }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    position: absolute;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 30px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0rgba(30,111,72,.35);
    border-radius: 10px
  }

  .tips {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      // 加
      img{
    position: absolute;
    width: 96px;
    height: 96px;
    top: -117px;
    left: 50%;
    margin-left: -48px
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
