<template>
  <div>
    <div class="dashboard-head">
      <div class="dashboard-head-left">
        <p>{{ currentUserName }}さん ようこそ！！</p>
      </div>
      <div class="dashboard-head-right">
        <p>残高：{{ currentUserWallet }}</p>
        <button type="button" class="btn-signout">
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
  },
  created: function() {
    this.$store.dispatch('getCurrentUserInfo');
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
</style>
