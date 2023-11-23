<template>
  <h1>📋 예금 비교</h1>
  <div
    style="display: flex; justify-content: space-between; align-items: center"
  >
    <select class="form-select selectbox" v-model="isSelected">
      <option :value="true">정기 예금 상품</option>
      <option :value="false">적금 상품</option>
    </select>
    <p class="text-primary">상품명 클릭 시 상세 페이지로 이동합니다.</p>
  </div>

  <div class="base">
    <div class="content">
      <div v-if="isSelected === true">
        <vue-good-table
          :columns="depositColumns"
          :rows="depositRows"
          :line-numbers="true"
          @row-click="depositDetail"
          class="product-table"
        />
      </div>
      <div v-else>
        <vue-good-table
          :columns="savingCoulumns"
          :rows="savingRows"
          :line-numbers="true"
          @row-click="savingDetail"
          class="product-table"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { computed } from "@vue/reactivity";
import axios from "axios";

const store = useProductsStore();

const depositColumns = computed(() => {
  return store.depositColumns;
});

const savingCoulumns = computed(() => {
  return store.savingCoulumns;
});

const depositRows = computed(() => {
  return store.depositRows;
});

const savingRows = computed(() => {
  return store.savingRows;
});

const router = useRouter();

const isSelected = ref(true);

const selected = computed(() => {
  if (isSelected === true) {
    return true;
  } else if (isSelected === false) {
    return false;
  }
});

const depositDetail = (product) => {
  axios({
    method: "post",
    url: `http://127.0.0.1:8000/products/deposit_views/${
      store.deposit_products.filter(
        (tmp) => tmp.fin_prdt_nm === product.row.fin_prdt_nm
      )[0].id
    }/`,
  })
    .then(() => {
      router.push({
        name: "deposit",
        params: {
          fin_prdt_cd: store.deposit_products.filter(
            (tmp) => tmp.fin_prdt_nm === product.row.fin_prdt_nm
          )[0].fin_prdt_cd,
        },
      });
    })
    .catch((err) => console.log(err));
};

const savingDetail = (product) => {
  axios({
    method: "post",
    url: `http://127.0.0.1:8000/products/saving_views/${
      store.saving_products.filter(
        (tmp) => tmp.fin_prdt_nm === product.row.fin_prdt_nm
      )[0].id
    }/`,
  })
    .then(() => {
      router.push({
        name: "saving",
        params: {
          fin_prdt_cd: store.saving_products.filter(
            (tmp) => tmp.fin_prdt_nm === product.row.fin_prdt_nm
          )[0].fin_prdt_cd,
        },
      });
    })
    .catch((err) => console.log(err));
};
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
.base {
  overflow: scroll;
  width: 100%;
  height: 1200px;
}

.content {
  width: 120%;
}

.select-category {
  display: flex;
}
.selectbox {
  width: 200px;
  margin: 0px 30px 20px 0px;
  border-color: rgb(119, 185, 252);
}

.product-container {
  display: flex;
  height: 50px;
  width: 100%;
}
</style>
<style>
.vgt-left-align:nth-child(even) {
  cursor: pointer;
  width: 250px;
}
.vgt-left-align:nth-child(odd) {
  width: 120px;
}
.vgt-left-align:nth-child(odd) {
  background-color: rgba(135, 207, 235, 0.2);
  cursor: pointer;
}
.vgt-right-align {
  background-color: rgba(135, 207, 235, 0.4);

  width: 100px;
}
</style>
