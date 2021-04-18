<template>
  <div class="form">
    <h2>ログイン画面</h2>
    <form>
      <dl>
        <dt>
          メールアドレス
        </dt>
        <dd>
          <input type="email" autocomplete="email" />
        </dd>
        <dt>
          パスワード
        </dt>
        <dd>
          <input type="password" autocomplete="current-password" />
        </dd>
      </dl>
      <button type="button" class="btn-submit">ログイン</button>
    </form>
    <div>
      <router-link to="/signup" class="link">新規登録はこちらから</router-link>
    </div>
  </div>
</template>
