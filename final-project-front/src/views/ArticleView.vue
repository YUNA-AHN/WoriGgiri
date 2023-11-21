<template>
  <div>
    <h1>📝 게시판</h1>
    <div class="article-list-header">
      <h2>Article List</h2>
      <RouterLink class="btn" :to="{ name: 'articlecreate' }"
        >게시물 생성</RouterLink
      >
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

// onMounted(() => {
//   store.getArticles();
// });
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

.btn {
  width: 150px;
  height: 50px;
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(80, 80, 80);
  font-size: 20px;
}
</style>
