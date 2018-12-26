import Vue from 'vue'
import Router from 'vue-router'
import Test from '../modules/test'
// const Test = () => import('@/modules/test')
// const TestTwo = () => import(/* webpackChunkName: "group-test" */'@/modules/test2')
// const TestThree = () => import(/* webpackChunkName: "group-test" */'@/modules/test3')
// const TestFour = () => import(/* webpackChunkName: "group-test" */'@/modules/test4')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test,
     
    }
  ]
})
