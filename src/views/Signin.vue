<template>
  <div class="form">
    <h2>ログイン画面</h2>
    <form>
      <dl>
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
            autocomplete="current-password"
            v-model="password"
          />
        </dd>
      </dl>
      <button type="button" class="btn-submit" @click="signIn">ログイン</button>
    </form>
    <div>
      <router-link to="/signup" class="link">新規登録はこちらから</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
    signIn() {
      this.$store.dispatch('signIn');
    },
  },
};
</script>
