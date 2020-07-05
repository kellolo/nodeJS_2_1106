import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './layout/style/style.css'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
