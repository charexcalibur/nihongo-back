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
    
    <head-top></head-top>

    <el-container>
      <el-main style="height: 100%">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import headTop from './../components/header'
export default {
  components: {
    headTop
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
</style>


