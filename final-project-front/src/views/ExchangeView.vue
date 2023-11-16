<template>
  <div>
    <h1>환율 계산기</h1>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

// 환율 정보 받을 배열 생성
const exchangeInfo = ref([]);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDay();

console.log(`${year}${month}${day}`);

const API_URL =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";
const api_key = "JCRjUvmotEolcA327lzEmt4EWJN97g16";

const serarchExchage = () => {
  axios.get(API_URL, {
    params: {
      key: api_key,
      searchdate: 20231116,
      data: "AP010",
    },
  });
};
</script>

<style scoped></style>
