<template>
  <h1>회원 가입</h1>

  <div>
    <form @submit.prevent="signUp" class="signup-form">
      <div class="info-list">
        <label for="username">이름 : </label>
        <input
          type="text"
          name="username"
          id="username"
          v-model.trim="username"
          class="form-control required"
          placeholder="(필수)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(필수)'"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          height: 25px;
          margin: 0px;
        "
      ></p>

      <div class="info-list">
        <label for="email">e-mail : </label>
        <input
          type="text"
          name="email"
          id="email"
          v-model.trim="email"
          class="form-control"
          placeholder="(선택)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(선택)'"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          height: 25px;
          margin: 0px;
        "
      ></p>
      <div class="info-list">
        <label for="password1">비밀번호 : </label>
        <input
          type="password"
          name="password1"
          id="password1"
          v-model.trim="password1"
          class="form-control required"
          placeholder="(필수)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(필수)'"
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
          class="form-control required"
          placeholder="(필수)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(필수)'"
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
          class="form-control"
          placeholder="(선택)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(선택)'"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          height: 25px;
          margin: 0px;
        "
      ></p>
      <div class="info-list">
        <label for="age">나이 : </label>
        <input
          type="text"
          name="age"
          id="age"
          v-model.trim="age"
          class="form-control"
          placeholder="(선택)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(선택)'"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          height: 25px;
          margin: 0px;
        "
      ></p>
      <div class="info-list">
        <label for="money">잔고 : </label>
        <input
          type="text"
          name="money"
          id="money"
          v-model.trim="money"
          class="form-control"
          placeholder="(선택)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(선택)'"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          height: 25px;
          margin: 0px;
        "
      ></p>
      <div class="info-list">
        <label for="salary">연봉 : </label>
        <input
          type="text"
          name="salary"
          id="salary"
          v-model.trim="salary"
          class="form-control"
          placeholder="(선택)"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='(선택)'"
        />
      </div>
      <p
        style="
          font-size: smaller;
          color: gray;
          font-weight: lighter;
          margin: 0px 0px;
        "
      ></p>
      <div class="info-list">
        <input id="btn" class="btn btn-info" type="submit" value="회원 가입" />
      </div>
    </form>
  </div>
</template>

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
.signup-form {
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  font-size: 20px;
}
.signup-form div {
  margin: 10px 0px;
}

.signup-form label {
  width: 150px;
}
.signup-form input {
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

.required::placeholder {
  color: crimson;
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

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignStore } from "@/stores/sign";

const router = useRouter();
const store = useSignStore();

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

  const payload = {
    username: username.value,
    password: password1.value,
  };

  axios({
    method: "post",
    url: "http://127.0.0.1:8000/dj-rest-auth/registration/",
    data: data,
  })
    .then((response) => {
      store.logIn(payload);
      router.push({ name: "main" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
