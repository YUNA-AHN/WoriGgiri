<template>
  <h1>상품 상세 정보</h1>
  <div>
    {{ product }}
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products"
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { ref } from "vue"

const store = useProductsStore()
const route = useRoute()

const productCd = route.params.fin_prdt_cd


// const filtered = ref(null)
const product = computed(() => {
  // filtered.value = store.deposit_products.filter((product) => 
  // product.fin_prdt_cd === productCd)
  return store.deposit_products?.filter((product) => 
  product.fin_prdt_cd === productCd)})

</script>


<style scoped>

</style>