import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
//引用element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios=axios

//定义一个全局过滤器，转换时间格式
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
