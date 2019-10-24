import Vue from 'vue'
import Router from 'vue-router'
// import Ebook from '@/Ebook'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [{
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('../Ebook.vue')
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../pages/login.vue')
    // },
    // {
    //   path: '/usercenter',
    //   name: 'usercenter',
    //   component: () => import('../pages/userCenter.vue')
    // },
    // {
    //   path: '/course',
    //   name: 'course',
    //   component: () => import('../pages/course.vue')
    // },
    // {
    //   path: '/',
    //   name: 'index',
    //   component: () => import('../pages/index.vue')
    // }
  ]
})
