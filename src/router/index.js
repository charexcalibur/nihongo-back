import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/components/upload'
import ShowQuestions from '@/components/showQuestions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/upload'
    },
    {
      path: '/upload',
      component: Upload
    },
    {
      path: '/showquestions',
      component: ShowQuestions
    }
  ]
})
