import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/page/upload'
import ShowQuestions from '@/page/showquestions'
import Manage from '@/page/manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/manage'
    },
    {
      path: '/manage',
      component: Manage,
      children: [{
        path: '/showquestions',
        component: ShowQuestions
      }, {
        path: 'upload',
        component: Upload
      }]
    }
  ]
})
