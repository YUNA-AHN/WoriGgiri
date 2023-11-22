<template>
  <div>
    <h1>비밀번호 변경</h1>
    <form @submit.prevent="passwordUpdate">
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

<style scoped></style>
