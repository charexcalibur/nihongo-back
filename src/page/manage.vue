<template>
<div class="manage">
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside  width="200px">
      <el-menu
        style="height:100%"
        background-color="#00896C"
        text-color="#fff"
        router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>数据查询</template>
          <el-menu-item-group>
            <el-menu-item index="showQuestions">题库列表</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>添加数据</template>
          <el-menu-item-group>
            <el-menu-item index="upload">添加题目</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="el-header" style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">登出</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{userName}}</span>
      </el-header>
      <el-main style="height: 100%">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>

  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认退出？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="logout">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userName: '',
      dialogVisible: false
    }
  },
  created () {
    this.checkLogin()
  },
  computed: {
    // userName () {
    //   return this.$store.state.userName
    // }
  },
  methods: {
    checkLogin () {
      axios.get('http://localhost:3000/admins/checkLogin')
      .then((response) => {
        let res = response.data
        console.log('res.result: ' + res.result)
        if (res.status === '0') {
          // todo
          this.$store.commit('updateUserInfo', res.result)
          this.userName = res.result
        } else {
          console.log(res.msg)
          this.$router.push('/')
        }
      })
    },
    logout () {
      axios.get('http://localhost:3000/admins/logout')
      .then((response) => {
        let res = response.data

        if (res.status === '0') {
          this.dialogVisible = false
          this.$router.push('/')
        } else {
          console.log(res.msg)
        }
      })
    },
    handleCommand (command) {
      if (command === 'a') {
        // this.logout()
        this.dialogVisible = true
      }
    }
  }
}
</script>

<style lang="stylus">
  .manage
    height 100%
    width 100%
  .el-icon-message
    color: white !important
  .el-icon-menu
    color: white !important
  .el-icon-setting
    color: white !important
  .el-header
    background-color #5DAC81
    line-height 60px 
</style>


