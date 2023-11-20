<template>
  <h1>상품 상세 정보</h1>
  <div class="product-info">
    <!-- {{ product }} -->
    <div>
      <span class="sub-title">공시 제출월</span>
      <span class="sub-detail">{{
        product.fin_co_subm_day.substring(0, 6)
      }}</span>
    </div>
    <div>
      <span class="sub-title">금융 회사명</span>
      <span class="sub-detail">{{ product.kor_co_nm }}</span>
    </div>
    <div>
      <span class="sub-title">상품명</span>
      <span class="sub-detail">{{ product.fin_prdt_nm }}</span>
    </div>
    <div>
      <span class="sub-title">가입 제한</span>
      <span class="sub-detail">{{ product.join_deny }}</span>
    </div>
    <div>
      <span class="sub-title">가입 방법</span>
      <span class="sub-detail">{{ product.join_way }}</span>
    </div>
    <div>
      <span class="sub-title"> 우대 조건 </span>
      <span class="sub-detail">{{ product.mtrt_int }}</span>
    </div>
    <p></p>
    <p></p>
    <p></p>
  </div>

  <!-- 
    가입하기 기능 -> 로그인 유저의 정보 테이블에 현재 상세페이지의 상품 정보를 저장
   -->
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { ref } from "vue";

const store = useProductsStore();
const route = useRoute();

const productCd = route.params.fin_prdt_cd;

// const filtered = ref(null)
const product = computed(() => {
  // filtered.value = store.deposit_products.filter((product) =>
  // product.fin_prdt_cd === productCd)
  return store.saving_products?.filter(
    (product) => product.fin_prdt_cd === productCd
  )[0];
});
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
  font-weight: bolder;
}
.product-info * {
  font-size: 18px;
}

h1 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px #0dcaf0 solid;
}

.product-info div {
  margin-bottom: 40px;
  display: flex;
}

.sub-title {
  display: block;
  width: 150px;
}
.sub-detail {
  margin: 0px 0px 0px 50px;
  width: 100%;
}
</style>
