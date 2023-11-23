<template>
  <div>
    <h1>{{ user?.username }}님의 프로필</h1>
    <p>이름 : {{ user?.username }}</p>
    <p>
      가입한 상품 : {{ user?.financial_products || "가입한 상품이 없습니다." }}
    </p>
    <p>나이 : {{ user?.age || "나이를 입력해주세요." }}</p>
    <p>
      잔고 :
      {{ Number(user?.money).toLocaleString() || "잔고를 입력해주세요." }} 원
    </p>
    <p>이메일 : {{ user?.email || "이메일을 입력해주세요." }}</p>
    <p>닉네임: {{ user?.nickname || "닉네임을 입력해주세요." }}</p>
    <p>
      연봉 :
      {{ Number(user?.salary).toLocaleString() || "연봉을 입력해주세요." }} 원
    </p>
    <button class="btn" @click="userupdate">프로필 수정하기</button>
    <button class="btn" @click="passwordchange">비밀번호 변경하기</button>
    <button class="btn" @click="userdelete">회원 탈퇴</button>

    <hr />
    <h3 @click="likesarticle">내 활동</h3>
    <hr />
    <h3>추천 상품</h3>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign.js";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const store = useArticleStore();
const signStore = useSignStore();
const user = ref(null);
const router = useRouter();

// 사용자 정보 수정
const userupdate = function () {
  router.push(`/update`);
};

// 비밀번호 변경
const passwordchange = function () {
  router.push(`/password`);
};

// 회원 탈퇴하기
const userdelete = function () {
  router.push(`/delete`);
};

// 내 활동 보러가기
const likesarticle = function () {
  router.push({ name: "likesarticle" });
};

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/accounts/`,
    headers: {
      Authorization: `Token ${signStore.token}`,
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
.btn {
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
