import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ru-RU'

import store from './__data__/store';

import app from './app';
import router from './router';

Vue.config.devtools = true;

Vue.use(ElementUI, {locale});

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app');
