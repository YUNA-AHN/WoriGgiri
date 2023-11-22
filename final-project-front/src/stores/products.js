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

  const columns = ref([
    {
      label: "공시 제출월",
      field: "fin_co_subm_day",
      type: "date",
      dateInputFormat: "yyyyMMdd",
      dateOutputFormat: "yyyyMMdd",
    },
    {
      label: "금융회사명",
      field: "kor_co_nm",
    },
    {
      label: "은행상품명",
      field: "fin_prdt_nm",
    },
    {
      label: "6개월",
      field: "intr_rate2_6",
      type: "number",
    },
    {
      label: "12개월",
      field: "intr_rate2_12",
      type: "number",
    },
    {
      label: "24개월",
      field: "intr_rate2_24",
      type: "number",
    },
    {
      label: "36개월",
      field: "intr_rate2_36",
      type: "number",
    },
  ]);
  const rows = computed(() => {
    const row = [];
    let product_id = 0;

    for (let idx in deposit_products.value) {
      const inner_ops = deposit_options.value?.filter(
        (tmp) => tmp.fin_prdt_cd === deposit_products.value[idx].id
      );

      const inner = {
        id: ++product_id,
        fin_co_subm_day: deposit_products.value[idx].fin_co_subm_day.substring(
          0,
          8
        ),
        kor_co_nm: deposit_products.value[idx].kor_co_nm,
        fin_prdt_nm: deposit_products.value[idx].fin_prdt_nm,
        intr_rate2_6: "없음",
        intr_rate2_12: "없음",
        intr_rate2_24: "없음",
        intr_rate2_36: "없음",
      };
      for (let idx in inner_ops) {
        if (inner_ops[idx].save_trm === 6) {
          inner.intr_rate2_6 = inner_ops[idx].intr_rate2;
        } else if (inner_ops[idx].save_trm === 12) {
          inner.intr_rate2_12 = inner_ops[idx].intr_rate2;
        } else if (inner_ops[idx].save_trm === 24) {
          inner.intr_rate2_24 = inner_ops[idx].intr_rate2;
        } else if (inner_ops[idx].save_trm === 36) {
          inner.intr_rate2_36 = inner_ops[idx].intr_rate2;
        }
      }
      row.push(inner);
    }
    return row;
  });

  return {
    deposit_products,
    deposit_options,
    saving_products,
    saving_options,
    bankList,
    columns,
    rows,
  };
});
