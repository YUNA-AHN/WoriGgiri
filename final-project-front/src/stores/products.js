import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", () => {
  const deposit_products = ref(null);
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/products/deposit_products/",
  })
    .then((response) => {
      deposit_products.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  const deposit_options = ref(null);
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/products/deposit_options/",
  })
    .then((response) => {
      deposit_options.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  const saving_products = ref(null);
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/products/saving_products/",
  })
    .then((response) => {
      saving_products.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  const saving_options = ref(null);
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/products/saving_options/",
  })
    .then((response) => {
      saving_options.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  const bankList = computed(() => {
    const list = [];
    for (let idx in deposit_products.value) {
      if (!list.includes(deposit_products.value[idx].kor_co_nm)) {
        list.push(deposit_products.value[idx].kor_co_nm);
      }
    }
    for (let idx in saving_products.value) {
      if (!list.includes(saving_products.value[idx].kor_co_nm)) {
        list.push(saving_products.value[idx].kor_co_nm);
      }
    }
    return list;
  });

  return {
    deposit_products,
    deposit_options,
    saving_products,
    saving_options,
    bankList,
  };
});
