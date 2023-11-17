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
// const router = useRouter();

// const logIn = () => {
//   axios({
//     method: "get",
//     url: `http://127.0.0.1:8000/`,
//     headers: {
//       Authorization: `Token ${token.value}`,
//     },
//   }).then((response) => {});
// };
// const token = ref(null);

// const logIn = () => {
//   const data = {
//     username: name.value,
//     password: password.value,
//   };
//   axios({
//     method: "post",
//     url: `http://localhost:8000/dj-rest-auth/login/`,
//     data: data,
//   })
//     .then((response) => {

//       alert("로그인 성공");
//       router.push({ name: "main" });
//     })
//     .catch((error) => {
//       alert("잘못 된 접근 방식입니다.");
//     });
// };
</script>

<style scoped></style>
