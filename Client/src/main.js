import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import Vuelidate from 'vuelidate'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './assets/themes/bootstrap.min.css'
// import './assets/js/google-code-prettify/prettify.css'
// import './assets/css/bootstrap-responsive.min.css'
// import './assets/css/base.css'
import { globals } from 'eslint-config-standard';

// import './assets/css/font-awesome.css'
// import './assets/css/font-awesome-ie7.css'

import authInspector from '@/plugins/authInspector'
import globalConfiguration from '@/plugins/globalConfiguration'


Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(Toasted, {
    position: "bottom-center",
    duration: 2000,
    fullWidth: true,
    fitToScreen: true,
    theme: "primary"
})
Vue.use(BootstrapVue)
Vue.use(authInspector)
Vue.use(globalConfiguration)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})