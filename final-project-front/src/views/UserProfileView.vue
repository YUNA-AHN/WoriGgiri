<template>
  <div>
    <h1>{{ user?.username }}님의 프로필</h1>
    <button>프로필 수정하기</button>
    <p>이름 : {{ user?.username }}</p>
    <p>
      가입한 상품 : {{ user?.financial_products || "가입한 상품이 없습니다." }}
    </p>
    <p>나이 : {{ user?.age || "나이를 입력해주세요." }}</p>
    <p>잔고 : {{ user?.money || "잔고를 입력해주세요." }}</p>
    <p>이메일 : {{ user?.email || "이메일을 입력해주세요." }}</p>
    <p>닉네임: {{ user?.nickname || "닉네임을 입력해주세요." }}</p>
    <p>연봉 : {{ user?.salary || "연봉을 입력해주세요." }}</p>

    <hr />
    <h3>추천 상품</h3>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign.js";
// import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const store = useArticleStore();
const token = useSignStore().token;
const user = ref(null);

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/dj-rest-auth/user/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      user.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped></style>
