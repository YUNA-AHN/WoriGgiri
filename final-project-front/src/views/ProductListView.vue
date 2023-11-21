<template>
  <h1>📋 예금 비교</h1>
  <div class="select-category">
    <select class="form-select selectbox" v-model="isSelected">
      <option value="default">전체 상품</option>
      <option value="deposit">정기 예금 상품</option>
      <option value="saving">적금 상품</option>
    </select>
    <select class="form-select selectbox" v-model="selectedBank">
      <option value="default">은행 목록</option>
      <option v-for="bank in store.bankList" :value="bank">
        {{ bank }}
      </option>
    </select>
  </div>

  <div class="base">
    <div class="titles">
      <span class="title-month"> 공시 제출월 </span>
      <span class="title-cn"> 금융회사명 </span>
      <span class="title-fn"> 은행상품명 </span>
      <span class="title-6"> 6개월 </span>
      <span class="title-12"> 12개월 </span>
      <span class="title-24">24개월</span>
      <span class="title-36">36개월</span>
    </div>
    <hr style="width: 170%" />
    <div
      class="deposit-products"
      v-if="isSelected === 'default' || isSelected === 'deposit'"
    >
      <div v-for="product in store.deposit_products" :key="product.id">
        <div
          class="product-container"
          v-if="
            selectedBank === 'default' || product.kor_co_nm === selectedBank
          "
        >
          <p class="title-month">
            {{ product.fin_co_subm_day.substring(0, 6) }}
          </p>
          <p class="title-cn">{{ product.kor_co_nm }}</p>
          <p class="title-fn" @click="depositDetail(product)">
            {{ product.fin_prdt_nm }}
          </p>
          <div v-for="option in store.deposit_options" :key="option.id">
            <div v-if="option.fin_prdt_cd === product.id">
              <div class="title-6" v-if="option.save_trm === 6">
                {{ option.intr_rate2 }}
              </div>
              <div class="title-12" v-if="option.save_trm === 12">
                {{ option.intr_rate2 }}
              </div>
              <div class="title-24" v-if="option.save_trm === 24">
                {{ option.intr_rate2 }}
              </div>
              <div class="title-36" v-if="option.save_trm === 36">
                {{ option.intr_rate2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="saving-products"
      v-if="isSelected === 'default' || isSelected === 'saving'"
    >
      <div v-for="product in store.saving_products" :key="product.id">
        <div
          class="product-container"
          v-if="
            selectedBank === 'default' || product.kor_co_nm === selectedBank
          "
        >
          <p class="title-month">
            {{ product.fin_co_subm_day.substring(0, 6) }}
          </p>
          <p class="title-cn">{{ product.kor_co_nm }}</p>
          <p class="title-fn" @click="savingDetail(product)">
            {{ product.fin_prdt_nm }}
          </p>
          <div v-for="option in store.saving_options" :key="option.id">
            <div v-if="option.fin_prdt_cd === product.id">
              <div class="title-6" v-if="option.save_trm === 6">
                {{ option.intr_rate2 }}
              </div>
              <div class="title-12" v-if="option.save_trm === 12">
                {{ option.intr_rate2 }}
              </div>
              <div class="title-24" v-if="option.save_trm === 24">
                {{ option.intr_rate2 }}
              </div>
              <div class="title-36" v-if="option.save_trm === 36">
                {{ option.intr_rate2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { useProductsStore } from "@/stores/products";
import { useLocationStore } from "@/stores/location";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
const store = useProductsStore();
const locationStore = useLocationStore();
const router = useRouter();

const isSelected = ref("default");
const selectedBank = ref("default");

const depositDetail = (product) => {
  router.push({
    name: "deposit",
    params: { fin_prdt_cd: product.fin_prdt_cd },
  });
};

const savingDetail = (product) => {
  router.push({ name: "saving", params: { fin_prdt_cd: product.fin_prdt_cd } });
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

/* .product-trm {
  border: 1px black solid;
  margin: 0px 3px;
} */
.deposit-products {
  width: 170%;
}
.saving-products {
  width: 170%;
}
.titles {
  width: 170%;
  display: flex;
}

.title-month {
  width: 120px;
}
.title-cn {
  width: 200px;
}

.title-fn {
  width: 300px;
}
.title-6 {
  width: 100px;
}

.title-12 {
  width: 100px;
}
.title-24 {
  width: 100px;
}
.title-36 {
  width: 100px;
}
</style>
