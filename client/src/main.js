import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-default/base.css'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import store from './store'
import './assets/styles.css'

Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem('user') != null && store.state.username === '') {
    store.commit('setUser', JSON.parse(window.localStorage.getItem('user')))
  }
  if (to.path === '/') {
    if (window.localStorage.getItem('user') !== null) {
      router.push({
        path: 'dashboard/all/all_news'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
