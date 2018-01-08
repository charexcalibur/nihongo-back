<template>
  <div id="app" class="fillcontainer">
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'app',
  // data () {
  //   return {
  //     userInfo: {}
  //   }
  // },
  // mounted () {
  //   // 组件开始挂载时获取用户信息
  //   this.getUserInfo()
  // },
  // methods: {
  //   getUserInfo () {
  //     this.userInfo = {
  //       userName: ''
  //     }
 
  //     axios.get('')
  //   }
  // }
}
</script>

<style>
   .fillcontainer {
    height: 100%;
    width: 100%; 
   }
</style>
