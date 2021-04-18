import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAM3Pt_KYAvzUMjXmlpb3u2j_Q9uYX5MR0',
  authDomain: 'vue-tipping-app-f9030.firebaseapp.com',
  projectId: 'vue-tipping-app-f9030',
  storageBucket: 'vue-tipping-app-f9030.appspot.com',
  messagingSenderId: '135293970932',
  appId: '1:135293970932:web:d774be689e81507db7f1a1',
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
