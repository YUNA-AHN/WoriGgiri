<template>
  <h1>회원 정보 수정</h1>
  <div>
    <form @submit.prevent="Update" class="signup-form">
      <div class="info-list">
        <label for="username">이름 : </label>
        <input
          type="text"
          name="username"
          id="username"
          v-model.trim="username"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (필수)
      </p>

      <div class="info-list">
        <label for="email">e-mail : </label>
        <input type="text" name="email" id="email" v-model.trim="email" />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (선택)
      </p>
      <div class="info-list">
        <label for="password1">비밀번호 : </label>
        <input
          type="password"
          name="password1"
          id="password1"
          v-model.trim="password1"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (필수) 비밀번호는 최소 8자 이상 입력해주세요.
      </p>
      <div class="info-list">
        <label for="password2">비밀번호 확인 : </label>
        <input
          type="password"
          name="password2"
          id="password2"
          v-model.trim="password2"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (필수) 비밀번호를 한 번 더 입력해주세요.
      </p>
      <div class="info-list">
        <label for="nickname">닉네임 : </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          v-model.trim="nickname"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (선택)
      </p>
      <div class="info-list">
        <label for="age">나이 : </label>
        <input type="text" name="age" id="age" v-model.trim="age" />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (선택)
      </p>
      <div class="info-list">
        <label for="money">잔고 : </label>
        <input type="text" name="money" id="money" v-model.trim="money" />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (선택)
      </p>
      <div class="info-list">
        <label for="salary">연봉 : </label>
        <input type="text" name="salary" id="salary" v-model.trim="salary" />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      >
        (선택)
      </p>
      <div class="info-list">
        <input id="btn" class="btn btn-info" type="submit" value="회원 가입" />
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { useSignStore } from "@/stores/Sign";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const store = useSignStore();
const router = useRouter();

const username = ref(null);
const email = ref(null);
const password1 = ref(null);
const password2 = ref(null);
const nickname = ref(null);
const age = ref(null);
const money = ref(null);
const salary = ref(null);

const Update = () => {
  const data = {
    username: username.value,
    password1: password1.value,
    password2: password2.value,
  };
  if (email.value !== null && email.value !== "") {
    data.email = email.value;
  }
  if (age.value !== null && age.value !== "") {
    data.age = age.value;
  }
  if (nickname.value !== null && nickname.value !== "") {
    data.nickname = nickname.value;
  }
  if (money.value !== null && money.value !== "") {
    data.money = money.value;
  }
  if (salary.value !== null && salary.value !== "") {
    data.salary = salary.value;
  }

  axios({
    method: "put",
    url: "http://127.0.0.1:8000/dj-rest-auth/user/",
    data: data,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((response) => {
      console.log(username.value);
      console.log(password1.value);
      console.log(password2.value);
      console.log(email.value);
      console.log(age.value);
      console.log(nickname.value);
      console.log(money.value);
      console.log(salary.value);
      console.log(store.token);
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
</style>
