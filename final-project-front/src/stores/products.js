import { ref, computed } from "vue";
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
    

  return { deposit_products, deposit_options };
});
