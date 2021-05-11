<template>
  <div>
    <div
      id="mask"
      :class="{ hidden: !$store.state.modalOn }"
      @click="toggleModal"
    ></div>
    <div id="modal" :class="{ hidden: !$store.state.modalOn }">
      <p>{{ clickedUser.name }}さんの残高</p>
      <p>{{ clickedUser.wallet }}</p>
      <button class="btn-close" @click="toggleModal">
        Close
      </button>
    </div>
    <div class="dashboard-head">
      <div class="dashboard-head-left">
        <p>{{ currentUserName }}さん ようこそ！！</p>
      </div>
      <div class="dashboard-head-right">
        <p>残高：{{ currentUserWallet }}</p>
        <button type="button" class="btn-signout" @click="signOut">
          ログアウト
        </button>
      </div>
    </div>
    <h2>ユーザー一覧</h2>
    <table>
      <tr>
        <th>ユーザー名</th>
        <th></th>
      </tr>
      <tr v-for="(otherUser, index) in otherUsers" :key="otherUser.index">
        <td>{{ otherUser.name }}</td>
        <td class="btn-td">
          <button type="button" @click="showWallet(index)">
            Walletを見る
          </button>
          <button type="button">送る</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    currentUserName() {
      return this.$store.getters.currentUserName;
    },
    currentUserWallet() {
      return this.$store.getters.currentUserWallet;
    },
    otherUsers() {
      return this.$store.getters.otherUsers;
    },
    clickedUser() {
      return this.$store.getters.clickedUser;
    },
  },
  created: function() {
    this.$store.dispatch('getAuth');
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
    toggleModal() {
      this.$store.commit('toggleModal');
    },
    showWallet(index) {
      this.toggleModal();
      this.$store.commit('getClickedUser', index);
    },
  },
};
</script>

<style scoped>
.dashboard-head {
  margin: 0 auto 40px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-head-right {
  display: flex;
  align-items: center;
}

.btn-signout {
  display: inline-block;
  padding: 4px 6px;
  text-decoration: none;
  font-size: 16px;
  background-color: #fff;
  color: #2e8acc;
  border: solid 1px #2e8acc;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-signout:hover {
  color: #fff;
  background-color: #2e8acc;
}

.dashboard-head-left p {
  margin-top: 0;
  margin-bottom: 0;
}

.dashboard-head-right p {
  margin-top: 0;
  margin-bottom: 0;
}

.dashboard-head-right p {
  display: inline-block;
  margin-right: 20px;
}

table {
  width: 50%;
  margin: 0 auto;
}

.btn-td button {
  display: inline-block;
  padding: 4px 6px;
  text-decoration: none;
  font-size: 14px;
  background-color: #17a2b8;
  color: #fff;
  border: solid 1px #17a2b8;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-td button:hover {
  opacity: 0.8;
}

.btn-td button:first-child {
  margin-right: 10px;
}

.btn-close {
  display: inline-block;
  padding: 6px 8px;
  text-decoration: none;
  font-size: 16px;
  background-color: #17a2b8;
  color: #fff;
  border: solid 1px #17a2b8;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close:hover {
  opacity: 0.8;
}

#mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
}

#modal {
  background: #fff;
  color: #555;
  width: 50%;
  padding: 20px;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
  transition: all 0.5s ease;
}

#modal p {
  margin: 0 0 20px;
}

#mask.hidden {
  display: none;
}

#modal.hidden {
  display: none;
}
</style>
