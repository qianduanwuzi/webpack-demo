// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    // 挂在到id=app的模板引擎上
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
