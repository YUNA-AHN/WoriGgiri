<template>
  <div>
    <h1>{{ user?.username }}님의 프로필</h1>
    <p class="my-0">
      <div style=" display: flex;; align-items: center;">
      <span style="margin-right: 30px;">
      이름 : {{ user?.username }}</span>
      <button id="btn-update" class="btn" @click="userupdate">
        프로필 수정하기
      </button>
    </div>
    </p>

    <p>
      가입한 상품 : {{ user?.financial_products?.substring(0, user?.financial_products?.length - 1) || "가입한 상품이 없습니다." }}
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
    <div class="btn-box">
      <button class="btn" style="font-size: larger;" @click="userdelete">회원 탈퇴</button>
    </div>
    <hr />
    <div class="act-box">
      <h2 @click="likesarticle">내 활동</h2>
    </div>
    <LikesArticleView />
    <div class="act-box">
      <h2 @click="deposit_recommend">금융 상품 추천 받기</h2>
      <div v-if="is_recommend">
        <h3>예금 상품 추천</h3>
        <div v-for="deposit in deposit_item">
          <p
          @click="godeposit(deposit.fin_prdt_cd)"  

          style="
          font-size: 17px;
          font-weight: lighter;
          height: 25px;
          margin: 10px;
        ">
        - {{ deposit.fin_prdt_nm }}</p> 
        </div>
        <h3>적금 상품 추천</h3>
        <div v-for="saving in saving_item">
          <p
          @click="gosaving(saving.fin_prdt_cd)"   

          style="
          font-size: 17px;
          font-weight: lighter;
          height: 25px;
          margin: 10px;
        ">
        - {{ saving.fin_prdt_nm }}</p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign.js";
import { useProductsStore } from "@/stores/products.js";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import LikesArticleView from "@/views/LikesArticleView.vue";

const store = useArticleStore();
const signStore = useSignStore();
const productsStore = useProductsStore()
const user = ref(null);
const router = useRouter();

// 사용자 정보 수정
const userupdate = function () {
  router.push(`/update`);
};

// 회원 탈퇴하기
const userdelete = function () {
  router.push(`/delete`);
};

// 내 활동 보러가기
const likesarticle = function () {
  router.push({ name: "likesarticle" });
};

// 추천 알고리즘
// const financial_products = computed(() => {
// return signStore.user.financial_products.split(',')
// })
const is_recommend = ref(false)
const financial_products = ref(null)

const deposit_item = ref(null)
const saving_item = ref(null)
const deposit_recommend = function() {
  const depositproducts = productsStore.deposit_products
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/products/recommendation/`,
    headers: {
      Authorization: `Token ${signStore.token}`,
    },
  })
    .then((res) => {
      console.log(res.data)
      // 필터, 조회수 필요
      deposit_item.value = res.data.depositdata
      saving_item.value = res.data.savingdata
      console.log(deposit_item.value)
      console.log(saving_item.value)

      is_recommend.value = !is_recommend.value
      
      // // 내가 가입한 상품 제외한 최고 금리 순 출력
      // const pds = financial_products.value.split(',')
      // console.log(pds)
      // console.log(depositproducts.filter((product) => !pds.includes(product.fin_prdt_cd)))
    })
    .catch((err) => {
      console.log(err);
    });
}

const godeposit = function (fin_prdt_cd) {
  router.push(`/deposit/${fin_prdt_cd}`)
}
const gosaving = function (fin_prdt_cd) {
  router.push(`/saving/${fin_prdt_cd}`)
}

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
      // username.value = user.value.username;
      // email.value = user.value.email;
      // nickname.value = user.value.nickname;
      // age.value = user.value.age;
      // money.value = user.value.money;
      // salary.value = user.value.salary;
      financial_products.value = user.value.financial_products;
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

#btn-update {
  width: 150px;
  height: 40px;
  margin: 10px 0px;
  font-size: smaller;
}
.btn {
  border: 1px solid rgba(119, 185, 252, 0.1);
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(60, 60, 60);
  font-size: 17px;
  font-weight: bolder;
  margin-top: 15px;
  width: 350px;
  height: 50px;
}
.act-box {
  width: 350px;
}
h2 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}
p {
  font-size: 20px;
  margin: 30px 0px;
}
</style>
