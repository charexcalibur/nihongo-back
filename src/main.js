import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import router from './router'
import 'minireset.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

// Vuex配置
const store = new Vuex.Store({
  state: {
    userInfo: {
      userName: null
    }
  },
  mutations: {
    // 更新用户信息
    updateUserInfo (state, newUserInfo) {
      state.userInfo.userName = newUserInfo
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
