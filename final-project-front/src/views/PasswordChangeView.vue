<template>
  <div>
    <h1>비밀번호 변경</h1>
    <form @submit.prevent="passwordUpdate" class="update-form">
      <div>
        <label for="password2">현재 비밀번호 : </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="password"
        />
      </div>
      <div>
        <label for="password2">새 비밀번호 : </label>
        <input
          type="password"
          name="newpassword1"
          id="newpassword1"
          v-model.trim="newpassword1"
        />
      </div>
      <div>
        <label for="password2">새 비밀번호 확인 : </label>
        <input
          type="password"
          name="newpassword2"
          id="newpassword2"
          v-model.trim="newpassword2"
        />
      </div>
      <div class="info-list">
        <input
          id="btn"
          class="btn btn-info"
          type="submit"
          value="비밀번호 변경"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { useSignStore } from "@/stores/Sign";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const store = useSignStore();
const router = useRouter();

const password = ref(null);
const newpassword1 = ref(null);
const newpassword2 = ref(null);

const passwordUpdate = function () {
  const data = {
    password: password.value,
    newpassword1: newpassword1.value,
    newpassword2: newpassword2.value,
  };

  axios({
    method: "post",
    url: "http://127.0.0.1:8000/accounts/password/",
    data: data,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((response) => {
      console.log(password.value);
      console.log(newpassword1.value);
      console.log(newpassword2.value);
      alert("비밀번호를 변경했습니다.");
      router.push({ name: "profile" });
    })
    .catch((error) => {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    });
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
.update-form {
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  font-size: 20px;
}
.update-form div {
  margin: 10px 0px;
}

.update-form label {
  width: 150px;
}
.update-form input {
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
