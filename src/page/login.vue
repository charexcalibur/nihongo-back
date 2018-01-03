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
        <el-button>注 册</el-button>
        <el-button @click="submitForm('loginForm')">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../api/login'

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
          login(this.formData)
        } else {
          alert('submit err')
          return false
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

