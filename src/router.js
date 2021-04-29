import Vue from 'vue';
import Router from 'vue-router';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', redirect: '/signin' },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next();
  }
});

export default router;
