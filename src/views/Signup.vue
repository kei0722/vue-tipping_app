<template>
  <div class="form">
    <h2>新規登録画面</h2>
    <form>
      <dl>
        <dt>
          ユーザー名
        </dt>
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
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: this.username,
          });
          alert('登録しました！');
          this.username = '';
          this.email = '';
          this.password = '';
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
