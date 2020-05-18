// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入mint-ui框架，并使用
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/CSS/home.css'
Vue.use(MintUI)
// 引入axios
import axios from "axios";
Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
