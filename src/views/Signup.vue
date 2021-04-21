<template>
  <div class="form">
    <h2>新規登録画面</h2>
    <form>
      <dl>
        <dt>ユーザー名</dt>
        <dd>
          <input type="text" autocomplete="username" v-model="username" />
        </dd>
        <dt>
          メールアドレス
        </dt>
        <dd>
          <input type="email" autocomplete="email" v-model="email" />
        </dd>
        <dt>
          パスワード
        </dt>
        <dd>
          <input
            type="password"
            autocomplete="new-password"
            v-model="password"
          />
        </dd>
      </dl>
      <button type="button" @click="signUp" class="btn-submit">
        新規登録
      </button>
    </form>
    <div>
      <router-link to="/signin" class="link">ログインはこちらから</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    doubleCount() {
      return this.$store.getters.doubleCount;
    },
    username: {
      get() {
        return this.$store.getters.username;
      },
      set(value) {
        this.$store.dispatch('updateUsername', value);
      },
    },
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(value) {
        this.$store.dispatch('updateEmail', value);
      },
    },
    password: {
      get() {
        return this.$store.getters.password;
      },
      set(value) {
        this.$store.dispatch('updatePassword', value);
      },
    },
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp');
    },
  },
};
</script>
