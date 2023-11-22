<template>
  <h1>📋 예금 비교</h1>

  <select class="form-select selectbox" v-model="isSelected">
    <option :value="true">정기 예금 상품</option>
    <option :value="false">적금 상품</option>
  </select>

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
import { useLocationStore } from "@/stores/location";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { computed } from "@vue/reactivity";

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
const selectedBank = ref("default");
const selectMonth = ref("default");

const depositDetail = (product) => {
  router.push({
    name: "deposit",
    params: {
      fin_prdt_cd: store.deposit_products.filter(
        (tmp) => tmp.fin_prdt_nm === product.row.fin_prdt_nm
      )[0].fin_prdt_cd,
    },
  });
};

const savingDetail = (product) => {
  router.push({
    name: "saving",
    params: {
      fin_prdt_cd: store.saving_products.filter(
        (tmp) => tmp.fin_prdt_nm === product.row.fin_prdt_nm
      )[0].fin_prdt_cd,
    },
  });
};

const rowStyleClassFn = () => {
  return "green";
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
  width: 200%;
}

.select-category {
  display: flex;
}
.selectbox {
  width: 200px;
  margin: 0px 30px 20px 0px;
}

.product-container {
  display: flex;
  height: 50px;
  width: 100%;
}
</style>
<style>
/* .vgt-table {
  border: 1px solid red;
  color: red;
  border-radius: 20px;
} */

/* table {
  color: red;
} */

.vgt-right-align span {
  color: red;
}

#col-5 {
  color: blue;
}
#col-6 {
  color: blue;
}
#col-7 {
  color: blue;
}
#col-8 {
  color: blue;
}
.vgt-right-align span {
  cursor: pointer;
}
</style>
