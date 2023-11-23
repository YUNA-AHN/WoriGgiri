<template>
  <h1>회원 정보 수정</h1>
  <div>
    <form @submit.prevent="Update" class="update-form">
      <div class="info-list">
        <label for="username">이름 : </label>
        <input
          type="text"
          name="username"
          id="username"
          v-model.trim="username"
          disabled
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
        <input
          id="btn"
          class="btn btn-info"
          type="submit"
          value="회원 정보 수정"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { useSignStore } from "@/stores/Sign";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUpdated } from "vue";
const store = useSignStore();
const router = useRouter();

const user = ref();
const token = store.token;

const username = ref(null);
const email = ref(null);

const nickname = ref(null);
const age = ref(null);
const money = ref(null);
const salary = ref(null);
const financial_products = ref(null);

const Update = () => {
  const data = {
    username: username.value,
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
    url: "http://127.0.0.1:8000/accounts/update/",
    data: data,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((response) => {
      store.user = {
        username: username.value,
        email: email.value,
        nickname: nickname.value,
        age: age.value,
        salary: salary.value,
        financial_products: financial_products.value,
        money: money.value,
      };
      console.log(username.value);
      // console.log(password1.value);
      // console.log(password2.value);
      console.log(email.value);
      console.log(age.value);
      console.log(nickname.value);
      console.log(money.value);
      console.log(salary.value);
      console.log(store.token);
      alert("회원 정보를 수정했습니다.");
      router.push({ name: "profile" });
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/accounts/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      user.value = res.data;
      username.value = user.value.username;
      email.value = user.value.email;
      nickname.value = user.value.nickname;
      age.value = user.value.age;
      money.value = user.value.money;
      salary.value = user.value.salary;
      financial_products.value = user.value.financial_products;
      console.log(salary);
    })
    .catch((err) => {
      console.log(err);
    });
});
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
