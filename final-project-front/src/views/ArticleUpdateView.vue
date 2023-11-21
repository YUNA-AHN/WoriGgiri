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
import { ref, onMounted, onUpdated } from "vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const articleId = route.params.id;
const store = useArticleStore();
// const { articles } = storeToRefs(store);

// console.log(articles);
// console.log(articles.value);

const title = ref(null);
const content = ref(null);

const token = useSignStore().token;
// updateArticle - 마찬가지로 새로고침 이슈..
const updateArticle = function () {
  axios({
    method: "put",
    url: `${store.API_URL}/articles/${articleId}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      title: title.value,
      content: content.value,
    },
  })
    .then((res) => {
      router.push(`/article/detail/${articleId}`);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

const article = ref(null);
onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/articles/${articleId}/`,
  })
    .then((res) => {
      article.value = res.data;
      // console.log(article.value);
      title.value = article.value.title;
      content.value = article.value.content;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped></style>
