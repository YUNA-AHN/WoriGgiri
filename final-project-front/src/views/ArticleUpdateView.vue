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
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const articleId = route.params.id;
const store = useArticleStore();

const article = store.articles.filter((product) => product.id == articleId)[0];

// 기존 값 입력해주기
const title = ref(article.title);
const content = ref(article.content);

// updateArticle - 마찬가지로 새로고침 이슈..
const updateArticle = function () {
  axios({
    method: "put",
    url: `${store.API_URL}/articles/${article.id}/`,
    data: {
      title: title.value,
      content: content.value,
    },
  })
    .then(() => {
      router.push(`/article/detail/${article.id}`);
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped></style>
