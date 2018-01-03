<template>
  <div class="loginPage">
    <div class="loginBox">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formData.use_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button>注 册</el-button>
        <el-button>登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        user_name: '',
        password: ''
      }
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

