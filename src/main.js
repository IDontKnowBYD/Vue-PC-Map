import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'ImbZUPbuo0Ir2XqvjpwKT1lGup8r1GZz'
})

new Vue({
  el: '#app',
  render: h => h(App)
})

