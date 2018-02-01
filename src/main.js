import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import '../theme/index.css'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './common/stylus/reset.styl'
import './common/stylus/common.styl'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  throttleWait: 100,
  error: require('./resource/img/default-user.jpg')
})
NProgress.inc()
NProgress.configure({easing: 'ease', speed: 500, showSpinner: true, trickleRate: 0.02, trickleSpeed: 800})
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (to.meta.title) {
    document.title = '云图睿视-' + to.meta.title
    store.dispatch('navbar', {title: to.meta.title})
  }
  if (to.matched.some(record => !record.meta.noCheckSession)) {
    // 这个路由需要auth,检验是否登录了.
    // console.log('need login', isLogin);
    if (!sessionStorage.getItem('user')) {
      next({
        path: '/login'
      })
      NProgress.done()
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
