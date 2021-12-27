import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import VueTimeago from 'vue-timeago'

// Styles
import "./styles/styles.scss";


Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: 'en', // Default locale
    // We use `date-fns` under the hood
    // So you can use all locales from it
    locales: {
        'zh-CN': require('date-fns/locale/zh_cn'),
        ja: require('date-fns/locale/ja')
    }
})
Vue.use(Element, { locale })
Vue.config.productionTip = false
Vue.config.lang= 'en';



new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')