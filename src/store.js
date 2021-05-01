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
    getCurrentUserInfo(state, currentUserInfo) {
      state.currentUser.name = currentUserInfo.name;
      state.currentUser.wallet = currentUserInfo.wallet;
    },
    getCurrentUserId(state, userId) {
      state.currentUser.id = userId;
    },
    clearCurrentUserInfo(state) {
      state.currentUser.id = '';
      state.currentUser.name = '';
      state.currentUser.wallet = '';
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
    getCurrentUser(context, userId) {
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          const currentUserInfo = doc.data();
          context.commit('getCurrentUserInfo', currentUserInfo);
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
            context.commit('getCurrentUserId', userCredential.user.uid);
            context.commit('emptyInputs');
            router.push('/dashboard');
          },
          (error) => {
            alert(error.message);
          }
        );
    },
    getAuth(context) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          context.commit('getCurrentUserId', user.uid);
          context.dispatch('getCurrentUser', user.uid);
        } else {
          router.push('/signin');
        }
      });
    },
    signOut(context) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit('clearCurrentUserInfo');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
