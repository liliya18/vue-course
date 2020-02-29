import Vue from 'vue';
import VueRouter from 'vue-router';

import Tickets from '../views/tickets';
import Map from '../views/map';
import About from '../views/about';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/about'},
        {path: '/tickets', component: Tickets},
        {path: '/map', component: Map},
        {path: '/about', component: About},
    ]
});

export default router;
