<template>
  <div>
    <h1>게시물 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model.trim="title" /><br />
      <label for="content">내용 : </label>
      <textarea type="text" id="content" v-model.trim="content"></textarea
      ><br />
      <input type="submit" />
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useArticleStore } from "@/stores/articles.js";
import { useSignStore } from "@/stores/sign.js";
import { useRouter } from "vue-router";

const title = ref(null);
const content = ref(null);

const store = useArticleStore();
const token = useSignStore().token;

console.log(token);

const router = useRouter();

const createArticle = function () {
  console.log(title.value);
  console.log(content.value);
  axios({
    method: "post",
    url: `${store.API_URL}/articles/`,
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      title: title.value,
      content: content.value,
    },
  })
    .then(() => {
      router.push({ name: "article" });
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped></style>
