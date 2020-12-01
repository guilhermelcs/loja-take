import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
