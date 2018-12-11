// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import Mock from './mock/mock'

Vue.use(ElementUI)
Vue.prototype.$ajax = axios
// Mock.init()
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // NProgress.start();
  if (to.path === '/') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/') {
    next({ path: '/' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
