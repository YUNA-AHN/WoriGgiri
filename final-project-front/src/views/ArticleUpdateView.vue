<template>
  <div>
    <h1>수정 페이지</h1>
    <form @submit.prevent="updateArticle">
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
import { ref } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign.js";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const articleId = route.params.id;
const store = useArticleStore();

const article = ref(
  store.articles.filter((product) => product.id == articleId)[0]
);

// 기존 값 입력해주기
const title = ref(article.value.title);
const content = ref(article.value.content);

const token = useSignStore().token;
// updateArticle - 마찬가지로 새로고침 이슈..
const updateArticle = function () {
  axios({
    method: "put",
    url: `${store.API_URL}/articles/${article.value.id}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      title: title.value,
      content: content.value,
    },
  })
    .then((res) => {
      router.push(`/article/detail/${article.value.id}`);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped></style>
