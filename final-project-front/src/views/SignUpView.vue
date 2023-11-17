<template>
  <h1>회원 가입 페이지</h1>
  <div>
    <form @submit.prevent="signUp">
      <div>
        <label for="username">이름 : </label>
        <input type="text" name="username" id="username" v-model="username" />
      </div>
      <label for="email">e-mail : </label>
      <input type="text" name="email" id="email" v-model="email" />
      <div>
        <label for="password1">비밀번호 : </label>
        <input
          type="password"
          name="password1"
          id="password1"
          v-model="password1"
        />
      </div>
      <label for="password2">비밀번호 확인 : </label>
      <input
        type="password"
        name="password2"
        id="password2"
        v-model="password2"
      />
      <div>
        <label for="nickname">닉네임 : </label>
        <input type="text" name="nickname" id="nickname" v-model="nickname" />
      </div>
      <label for="age">나이 : </label>
      <input type="text" name="age" id="age" v-model="age" />
      <div>
        <label for="money">잔고 : </label>
        <input type="text" name="money" id="money" v-model="money" />
      </div>
      <label for="salary">연봉 : </label>
      <input type="text" name="salary" id="salary" v-model="salary" />
      <div>
        <input type="submit" value="회원 가입" />
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref(null);
const email = ref(null);
const password1 = ref(null);
const password2 = ref(null);
const nickname = ref(null);
const age = ref(null);
const money = ref(null);
const salary = ref(null);

const signUp = () => {
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
    method: "post",
    url: "http://127.0.0.1:8000/dj-rest-auth/registration/",
    data: data,
  })
    .then((response) => {
      router.push({ name: "main" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped></style>
