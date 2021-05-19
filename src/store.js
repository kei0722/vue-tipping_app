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
    otherUsers: [],
    clickedUser: {
      name: '',
      wallet: '',
      id: '',
    },
    sendWalletAmount: '',
    showModal: false,
    onModal: '',
  },
  getters: {
    username: (state) => state.username,
    email: (state) => state.email,
    password: (state) => state.password,
    currentUserId: (state) => state.currentUser.id,
    currentUserName: (state) => state.currentUser.name,
    currentUserWallet: (state) => state.currentUser.wallet,
    otherUsers: (state) => state.otherUsers,
    clickedUser: (state) => state.clickedUser,
    showModal: (state) => state.showModal,
    onModal: (state) => state.onModal,
    sendWalletAmount: (state) => state.sendWalletAmount,
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
    pushOtherUsers(state, otherUser) {
      state.otherUsers.push(otherUser);
    },
    clearCurrentUserInfo(state) {
      state.currentUser.id = '';
      state.currentUser.name = '';
      state.currentUser.wallet = '';
    },
    clearOtherUsers(state) {
      state.otherUsers = [];
    },
    getClickedUser(state, index) {
      state.clickedUser.name = state.otherUsers[index].name;
      state.clickedUser.wallet = state.otherUsers[index].wallet;
      state.clickedUser.id = state.otherUsers[index].id;
    },
    switchToShowWallet(state) {
      state.onModal = 'showWallet';
    },
    switchToSend(state) {
      state.onModal = 'sendWallet';
    },
    toggleModal(state) {
      state.showModal = !state.showModal;
    },
    updateSendWalletAmount(state, value) {
      state.sendWalletAmount = value;
    },
    clearSendWalletAmount(state) {
      state.sendWalletAmount = '';
    },
    calculateWallet(state) {
      state.currentUser.wallet =
        Number(state.currentUser.wallet) - Number(state.sendWalletAmount);
      state.clickedUser.wallet =
        Number(state.clickedUser.wallet) + Number(state.sendWalletAmount);
    },
    updateClickedUserWallet(state) {
      state.otherUsers.find(
        (value) => value.id === state.clickedUser.id
      ).wallet = state.clickedUser.wallet;
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
    getOtherUsers(context, userId) {
      firebase
        .firestore()
        .collection('users')
        .where(firebase.firestore.FieldPath.documentId(), '!=', userId)
        .get()
        .then((docs) => {
          context.commit('clearOtherUsers');
          docs.forEach((doc) => {
            if (doc.data().name) {
              context.commit('pushOtherUsers', doc.data());
            }
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    calculateCurrentUserWallet(context) {
      firebase
        .firestore()
        .collection('users')
        .doc(context.state.currentUser.id)
        .update({
          wallet: context.state.currentUser.wallet,
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    calculateClickedUserWallet(context) {
      firebase
        .firestore()
        .collection('users')
        .doc(context.state.clickedUser.id)
        .update({
          wallet: context.state.clickedUser.wallet,
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    sendWallet(context) {
      if (context.state.sendWalletAmount !== '') {
        context.commit('calculateWallet');
        context.commit('updateClickedUserWallet');
        context.dispatch('calculateCurrentUserWallet');
        context.dispatch('calculateClickedUserWallet');
      }
    },
    createAccount(context, userCredential) {
      firebase
        .firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          id: userCredential.user.uid,
          name: context.state.username,
          email: context.state.email,
          wallet: 1000,
        })
        .then(() => {
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
          context.dispatch('getOtherUsers', user.uid);
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
