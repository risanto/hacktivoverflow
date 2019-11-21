import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import colors from 'vuetify/lib/util/colors'
import wysiwyg from "vue-wysiwyg";
import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {});
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base, // #3F51B5
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
