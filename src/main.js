// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import httpServer from './http.js'
import moment from 'moment'
import Crumbs from './components/Crumbs.vue'

Vue.use(httpServer);

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// Vue.prototype.$http = axios
Vue.component('cruLink', Crumbs);

Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD');
})
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
