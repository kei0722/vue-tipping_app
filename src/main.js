import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebaseConfig from './firebase.config';
import firebase from 'firebase/app';
import 'firebase/auth';

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

new Vue({
  router,
  store,
  firebaseConfig,
  render: (h) => h(App),
}).$mount('#app');
