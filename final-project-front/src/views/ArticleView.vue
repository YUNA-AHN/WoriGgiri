<template>
  <div>
    <h1>게시판</h1>
    <RouterLink :to="{ name: 'articleCreate' }">[게시물 생성]</RouterLink>
    <ArticleList />
  </div>
</template>

<script setup>
import ArticleList from "@/components/ArticleList.vue";
import { useArticleStore } from "@/stores/articles";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";

const store = useArticleStore();

onMounted(() => {
  store.getArticles();
});
</script>

<style scoped></style>
