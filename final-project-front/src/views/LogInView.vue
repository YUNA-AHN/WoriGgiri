<template>
  <h1>로그인</h1>
  <div class="form-container">
    <form class="login-form" @submit.prevent="logIn">
      <div>
        <label style="margin-bottom: 20px" for="username">아이디</label>
        <input
          class="form-control"
          type="text"
          name="username"
          id="username"
          v-model="username"
        />
      </div>
      <div>
        <label style="margin-bottom: 20px" for="password"> 비밀번호</label>
        <input
          class="form-control"
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <input class="btn btn-info" type="submit" value="로그인" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { routerKey, useRouter } from "vue-router";
import { useSignStore } from "@/stores/sign";

const store = useSignStore();
const username = ref(null);
const password = ref(null);

const logIn = () => {
  const payload = {
    username: username.value,
    password: password.value,
  };
  store.logIn(payload);
};
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
}
h1 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.login-form {
  width: 500px;
  height: 350px;
  font-size: 18px;
  font-weight: bolder;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
