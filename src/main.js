import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('loadLocalData')
  }
}).$mount('#app')
