import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebaseConfig from './firebase.config';

new Vue({
  router,
  store,
  firebaseConfig,
  render: (h) => h(App),
}).$mount('#app');
