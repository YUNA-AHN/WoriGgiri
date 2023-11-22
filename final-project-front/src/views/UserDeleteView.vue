<template>
  <div>
    <h1>회원 탈퇴</h1>
    <form @submit.prevent="Delete">
      <div>
        <label for="password2">비밀번호 : </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="password"
        />
        <div class="info-list">
          <input
            id="btn"
            class="btn btn-info"
            type="submit"
            value="회원 탈퇴"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { useSignStore } from "@/stores/Sign";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { storeToRefs } from "pinia";

const store = useSignStore();
const router = useRouter();

console.log(window.localStorage);
const { username, token } = storeToRefs(store);

const password = ref(null);
const Delete = function () {
  const data = {
    password: password.value,
  };
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/accounts/delete/",
    data: data,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((response) => {
      console.log(password.value);
      alert("우리끼리 회원탈퇴가 완료되었습니다.");
      // store.logout();
      window.localStorage.removeItem("sign");
      username.value = null;
      token.value = null;
      router.push({ name: "main" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped></style>
