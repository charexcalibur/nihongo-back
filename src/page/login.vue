<template>
  <div class="loginPage">
    <div class="loginBox">
      <el-form ref="loginForm" label-position="left" label-width="80px" :model="formData" :rules="rules">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="formData.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="submitForm('loginForm')">注 册</el-button>
        <el-button @click="login()">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {login, checkuser} from '../api/login'
import axios from 'axios'
import router from '../router/index'

export default {
  data () {
    return {
      formData: {
        user_name: '',
        password: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2到6个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
  .btn
    display flex
    justify-content space-between
    width 265px
    margin-top 8px

</style>

