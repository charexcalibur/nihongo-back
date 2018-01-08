<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <span>头部</span>
      <span v-text="userName"></span>
    </el-header>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // userName: ''
    }
  },
  created () {
    this.checkLogin()
  },
  computed: {
    userName () {
      return this.$store.state.userName
    }
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
        } else {
          console.log(res.msg)
          // this.$router.push('/')
        }
      })
    }
  }
}
</script>

