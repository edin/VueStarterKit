import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
import router from '@/router'

import 'vuetify/dist/vuetify.min.css'
import "@/style/app.css"

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: (h:any) => h(App)
}).$mount('#app')
