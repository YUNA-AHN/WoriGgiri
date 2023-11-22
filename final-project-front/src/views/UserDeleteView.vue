<template>
  <div>
    <h1>회원 탈퇴</h1>
    <form @submit.prevent="Delete" class="delete-form">
      <div class="info-list">
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

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
  font-weight: bolder;
}
h1 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}
.delete-form {
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  font-size: 20px;
}
.delete-form div {
  margin: 10px 0px;
}

.delete-form label {
  width: 150px;
}
.delete-form input {
  width: 300px;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: lightgray solid 1px;
  font-size: 20px;
  font-weight: bolder;
}

.info-list {
  display: flex;
}

#btn {
  border: 1px solid rgba(119, 185, 252, 0.1);
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(60, 60, 60);
  font-size: 17px;
  font-weight: bolder;
  margin-top: 15px;
  width: 450px;
  height: 50px;
}
</style>
