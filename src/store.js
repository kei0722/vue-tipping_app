import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    email: '',
    password: '',
  },
  getters: {
    username: (state) => state.username,
    email: (state) => state.email,
    password: (state) => state.password,
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
    signUp(context) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          context.state.email,
          context.state.password
        )
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: context.state.username,
          });
          alert('登録しました！');
          context.state.username = '';
          context.state.email = '';
          context.state.password = '';
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
