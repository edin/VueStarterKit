import Vue from 'vue'
import ApplicationShell from '@/ApplicationShell.vue'
import {App} from '@/Application';
import vuetify from '@/plugins/vuetify';
import router from '@/router'

import 'vuetify/dist/vuetify.min.css'
import "@/style/app.css"

Vue.config.productionTip = false

Vue.prototype.$app = App;

new Vue({
  vuetify,
  router,
  render: (h:any) => h(ApplicationShell)
}).$mount('#app')
