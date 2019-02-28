import Vue from 'vue'
import App from './App.vue'

import "chart.js"
import "hchs-vue-charts"
Vue.use(VueCharts);

new Vue({
  el: '#app',
  render: h => h(App)
})
