<template>
  <h1>로그인 페이지</h1>
  <div>
    <form @submit.prevent="logIn">
      <div>
        <label for="username">아이디 : </label>
        <input type="text" name="username" id="username" v-model="username" />
      </div>
      <div>
        <label for="password"> 비밀번호 : </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <input type="submit" value="로그인" />
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
  // console.log(store.token.value);
  store.logIn(payload);
};

</script>

<style scoped></style>
