<template>
  <h1>정기 예금 상품</h1>
  <div class="deposit-products">
    <div v-for="product in store.deposit_products" :key="product.id">
      <!-- {{ product }} -->
      <p>공시 제출월 : {{ product.fin_co_subm_day.substring(0, 6) }}</p>
      <p>금융회사명 : {{ product.kor_co_nm }}</p>
      <p @click="detail(product)">상품명 : {{ product.fin_prdt_nm }}</p>
      <div v-for="option in store.deposit_options" :key="option.id">
        <!-- {{ product.fin_prdt_nm }} -->
        <div v-if="option.fin_prdt_cd === product.id">
          <div v-if="option.save_trm === 6">
            6개월 : {{ option.intr_rate2 }}
          </div>
          <div v-if="option.save_trm === 12">
            12개월 : {{ option.intr_rate2 }}
          </div>
          <div v-if="option.save_trm === 24">
            24개월 : {{ option.intr_rate2 }}
          </div>
          <div v-if="option.save_trm === 36">
            36개월 : {{ option.intr_rate2 }}
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = useProductsStore();
const router = useRouter();

const detail = (product) => {
  router.push({ name: "detail", params: { fin_prdt_cd: product.fin_prdt_cd } });
};
</script>

<style scoped></style>
