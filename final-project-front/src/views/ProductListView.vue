<template>
  <h1>정기 예금</h1>
  <div>
    <div v-for="product in store.deposit_products" :key="product.id">
      {{ product.fin_prdt_nm }}
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { useProductsStore } from "@/stores/products";
const store = useProductsStore();
</script>

<style scoped></style>
