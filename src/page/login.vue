<template>
  <div class="loginPage">
    <div class="loginBox">
      <el-form ref="loginForm" label-position="left" label-width="80px" :model="formData" :rules="rules">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="formData.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" @keyup.enter.native="login"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="submitForm('loginForm')">注 册</el-button>
        <el-button @click="login">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {login, checkuser} from '../api/login'
import axios from 'axios'
import router from '../router/index'
import {debounce} from './../common/util'

axios.defaults.withCredentials = true

export default {
  data () {
    var checkSpace = (rule, value, callback) => {
      if (value.charAt(0) === ' ') {
        return callback(new Error('不能包含空格'))
      } else if (value.indexOf(' ') != 0) {
        return callback(new Error('不能包含空格'))
      } else {
        return callback()
      }
    }
    return {
      formData: {
        user_name: '',
        password: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2到6个字符', trigger: 'blur' },
          { validator: checkSpace, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkSpace, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 限流函数
    throttle (func, context) {
      clearTimeout(func.tId)
      func.tId = setTimeout(() => {
        func.call(context)
      }, 1000)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         // 检测相同id
          axios.get('http://localhost:3000/admins/checkuser', {
            params: {
              user_name: this.formData.user_name
            }
          }).then((response) => {
           let res = response.data
            if (res.status === '0') {
              if (res.result.user_code > 0) {
               console.log('find same id')
               this.$message({
                 message: '已存在相同id',
                 type: 'warning'
               })
              } else {
               console.log('no same id')
               axios.post('http://localhost:3000/admins/create', {
                 user_name: this.formData.user_name,
                 password: this.formData.password
               }).then((response) => {
                 let res = response.data

                 if (res.status === '1') {
                   console.log('出现错误: ' + res.msg)
                 } else {
                   console.log(res.msg)
                   this.$message({
                     message: '注册成功',
                     type: 'success'
                   })
                 }
               })
              }
            }
          })
        } else {
          alert('submit err')
          return false
        }
      })
    },
    login () {
      if (this.formData.user_name === '') {
        console.log('username: ' + this.formData.user_name)
        this.$message({
          message: '用户名密码不能为空',
          type: 'warning'
        })
      } else {
        axios.get('http://localhost:3000/admins/login', {
          params: {
            user_name: this.formData.user_name,
            password: this.formData.password
          }
        })
        .then((response) => {
          let res = response.data

          if (res.status === '1') {
            console.log(res.msg)
          } else if (res.status === '0') {
            console.log(res.msg)
            this.$message({
              message: '密码错误',
              type: 'warning'
            })
          } else if (res.status === '3') {
            this.$message({
              message: '未注册用户',
              type: 'warning'
            })
          } else {
            console.log(res.msg)
            this.$store.commit('updateUserInfo', this.formData.user_name)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            router.push('/manage')
          }
        })
      }
    },
    _login () {
      this.throttle(this.login())
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginPage
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%
    background-color #00896C
  .loginBox
    display flex
    align-items center
    justify-content center
    flex-direction column
    border-radius 4px
    height 30%
    width 400px
    padding 14px
    background-color white
    box-shadow 3px 3px 4px rgba(0, 0, 0, 0.3)
  .btn
    display flex
    justify-content space-between
    width 265px
    margin-top 8px

</style>

