<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view></router-view>
    <small>Copyrigth &copy;2019 ◯◯ Inc. rights reserved.</small>
  </div>
</template>

<script></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form {
  margin-bottom: 50px;
}

form {
  margin: 0 auto;
  padding: 10px 50px;
  width: 342px;
}

form dl dt {
  width: 165px;
  padding: 5px 0;
  float: left;
  clear: both;
}

form dl dd {
  padding: 5px 0;
}

.btn-submit {
  display: inline-block;
  padding: 6px 8px;
  text-decoration: none;
  font-size: 18px;
  background-color: #fff;
  color: #2e8acc;
  border: solid 1px #2e8acc;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  color: #fff;
  background-color: #2e8acc;
}

.link {
  color: #2e8acc;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link:hover {
  text-decoration: underline;
}
</style>
