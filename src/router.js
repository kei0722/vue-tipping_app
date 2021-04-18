import Vue from 'vue';
import Router from 'vue-router';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', redirect: '/signin' },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
  ],
});
