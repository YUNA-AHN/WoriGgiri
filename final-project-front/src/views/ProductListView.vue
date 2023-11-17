<template>
  <h1>정기 예금</h1>
  <div>
    <div v-for="product in store.deposit_products" :key="product.id">
      <!-- {{ product }} -->
      <p>공시 제출일 : {{ product.fin_co_subm_day }}</p>
      <p>금융회사명 : {{ product.kor_co_nm }}</p>
      <p>상품명 : {{ product.fin_prdt_nm }}</p>
      <div v-for="option in store.deposit_options" :key="option.id">
        <!-- {{ product.fin_prdt_nm }} -->
        <div v-if="option.fin_prdt_cd === product.id">
          {{ option }}
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { useProductsStore } from "@/stores/products";
const store = useProductsStore();
</script>

<style scoped></style>
