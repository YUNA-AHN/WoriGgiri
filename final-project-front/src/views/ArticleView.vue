<template>
  <div>
    <h1>📝 게시판</h1>
    <div class="article-list-header">
      <h2>Article List</h2>
      <RouterLink :to="{ name: 'articlecreate' }">[게시물 생성]</RouterLink>
    </div>
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
.article-list-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
