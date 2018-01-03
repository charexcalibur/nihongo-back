import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/page/upload'
import ShowQuestions from '@/page/showquestions'
import Manage from '@/page/manage'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/manage',
      component: Manage,
      children: [{
        path: '/showquestions',
        component: ShowQuestions
      }, {
        path: '/upload',
        component: Upload
      }]
    }
  ]
})
