// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'    // 使用 CSS

import './assets/iconfont/iconfont.css'  //使用自定义图标

import config from  './config'
import Bus from 'vue'
Vue.prototype.config = config;
Vue.prototype.bus = new Bus();

Vue.use(iView)
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.http.options.root='http://116.228.202.222:18680/'
//Vue.http.options.root='http://localhost:8180/'
//Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/json;charset=UTF-8',
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
