import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    email: '',
    password: '',
    currentUser: {
      id: '',
      name: '',
      wallet: '',
    },
  },
  getters: {
    username: (state) => state.username,
    email: (state) => state.email,
    password: (state) => state.password,
    currentUserId: (state) => state.currentUser.id,
    currentUserName: (state) => state.currentUser.name,
    currentUserWallet: (state) => state.currentUser.wallet,
  },
  mutations: {
    updateUsername(state, newUsername) {
      state.username = newUsername;
    },
    updateEmail(state, newEmail) {
      state.email = newEmail;
    },
    updatePassword(state, newPassword) {
      state.password = newPassword;
    },
    emptyInputs(state) {
      state.username = '';
      state.email = '';
      state.password = '';
    },
    goToSigninPage() {
      router.push('/signin');
    },
    getCurrentUserId(state, userCredential) {
      state.currentUser.id = userCredential.user.uid;
    },
  },
  actions: {
    updateUsername(context, newUsername) {
      context.commit('updateUsername', newUsername);
    },
    updateEmail(context, newEmail) {
      context.commit('updateEmail', newEmail);
    },
    updatePassword(context, newPassword) {
      context.commit('updatePassword', newPassword);
    },
    goToSigninPage(context) {
      context.commit('goToSigninPage');
    },
    getCurrentUserInfo(context) {
      firebase
        .firestore()
        .collection('users')
        .doc(context.state.currentUser.id)
        .get()
        .then((doc) => {
          const currentUserInfo = doc.data();
          context.state.currentUser.name = currentUserInfo.name;
          context.state.currentUser.wallet = currentUserInfo.wallet;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    createAccount(context, userCredential) {
      firebase
        .firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          name: context.state.username,
          email: context.state.email,
          wallet: 1000,
        })
        .then(function() {
          alert('登録しました！');
          context.commit('emptyInputs');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    signUp(context) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          context.state.email,
          context.state.password
        )
        .then((userCredential) => {
          context.dispatch('createAccount', userCredential);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    signIn(context) {
      firebase
        .auth()
        .signInWithEmailAndPassword(context.state.email, context.state.password)
        .then(
          (userCredential) => {
            context.commit('getCurrentUserId', userCredential);
            context.commit('emptyInputs');
            router.push('/dashboard');
          },
          (error) => {
            alert(error.message);
          }
        );
    },
  },
});
