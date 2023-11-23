import { ref, computed, onMounted, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", () => {
  const API_URL = "http://127.0.0.1:8000";
  axios({
    method: "get",
    url: `${API_URL}/products/save/`,
  })
    .then((response) => {
      console.log("데이터 로드 완료");
    })
    .catch((error) => {
      console.log("데이터가 이미 존재합니다.");
    });

  const deposit_products = ref(null);
  axios({
    method: "get",
    url: `${API_URL}/products/deposit_products/`,
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
    url: `${API_URL}/products/deposit_options/`,
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
    url: `${API_URL}/products/saving_products/`,
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
    url: `${API_URL}/products/saving_options/`,
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

  const depositColumns = ref([
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

  const savingCoulumns = ref([
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
      label: "적립 유형",
      field: "rsrv_type_nm",
    },
    {
      label: "6개월 (우대)",
      field: "intr_rate2_6",
      type: "number",
    },
    {
      label: "12개월 (우대)",
      field: "intr_rate2_12",
      type: "number",
    },
    {
      label: "24개월 (우대)",
      field: "intr_rate2_24",
      type: "number",
    },
    {
      label: "36개월 (우대)",
      field: "intr_rate2_36",
      type: "number",
    },
    {
      label: "6개월 (기본)",
      field: "intr_rate_6",
      type: "number",
    },
    {
      label: "12개월 (기본)",
      field: "intr_rate_12",
      type: "number",
    },
    {
      label: "24개월 (기본)",
      field: "intr_rate_24",
      type: "number",
    },
    {
      label: "36개월 (기본)",
      field: "intr_rate_36",
      type: "number",
    },
  ]);
  const depositRows = computed(() => {
    const depositRow = [];

    for (let idx in deposit_products.value) {
      const inner_ops = deposit_options.value?.filter(
        (tmp) => tmp.fin_prdt_cd === deposit_products.value[idx].id
      );

      const depositInner = {
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
          depositInner.intr_rate2_6 = inner_ops[idx].intr_rate2;
        } else if (inner_ops[idx].save_trm === 12) {
          depositInner.intr_rate2_12 = inner_ops[idx].intr_rate2;
        } else if (inner_ops[idx].save_trm === 24) {
          depositInner.intr_rate2_24 = inner_ops[idx].intr_rate2;
        } else if (inner_ops[idx].save_trm === 36) {
          depositInner.intr_rate2_36 = inner_ops[idx].intr_rate2;
        }
      }
      depositRow.push(depositInner);
    }
    return depositRow;
  });

  const savingRows = computed(() => {
    const savingRow = [];
    for (let idx in saving_products.value) {
      const inner_ops = saving_options.value?.filter(
        (tmp) => tmp.fin_prdt_cd === saving_products.value[idx].id
      );

      const savingInner = {
        fin_co_subm_day: saving_products.value[idx].fin_co_subm_day.substring(
          0,
          8
        ),
        kor_co_nm: saving_products.value[idx].kor_co_nm,
        fin_prdt_nm: saving_products.value[idx].fin_prdt_nm,
        intr_rate2_6: "없음",
        intr_rate2_12: "없음",
        intr_rate2_24: "없음",
        intr_rate2_36: "없음",
        intr_rate_6: "없음",
        intr_rate_12: "없음",
        intr_rate_24: "없음",
        intr_rate_36: "없음",
      };
      for (let idx in inner_ops) {
        if (inner_ops[idx].rsrv_type_nm === "자유적립식") {
          if (inner_ops[idx].save_trm === 6) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_6 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_6 = inner_ops[idx].intr_rate;
          } else if (inner_ops[idx].save_trm === 12) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_12 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_12 = inner_ops[idx].intr_rate;
          } else if (inner_ops[idx].save_trm === 24) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_24 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_24 = inner_ops[idx].intr_rate;
          } else if (inner_ops[idx].save_trm === 36) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_36 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_36 = inner_ops[idx].intr_rate;
          }
        } else if (inner_ops[idx].rsrv_type_nm === "정액적립식") {
          if (inner_ops[idx].save_trm === 6) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_6 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_6 = inner_ops[idx].intr_rate;
          } else if (inner_ops[idx].save_trm === 12) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_12 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_12 = inner_ops[idx].intr_rate;
          } else if (inner_ops[idx].save_trm === 24) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_24 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_24 = inner_ops[idx].intr_rate;
          } else if (inner_ops[idx].save_trm === 36) {
            savingInner.rsrv_type_nm = inner_ops[idx].rsrv_type_nm;
            savingInner.intr_rate2_36 = inner_ops[idx].intr_rate2;
            savingInner.intr_rate_36 = inner_ops[idx].intr_rate;
          }
        }
      }
      savingRow.push(savingInner);
    }

    return savingRow;
  });

  return {
    deposit_products,
    deposit_options,
    saving_products,
    saving_options,
    bankList,
    depositColumns,
    savingCoulumns,
    depositRows,
    savingRows,
    API_URL,
  };
});
