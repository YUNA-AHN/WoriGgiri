<template>
  <div>
    <h1>Article List</h1>
    <ArticleListItem
      v-for="article in store.articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup>
import ArticleListItem from "@/components/ArticleListItem.vue";
import { useArticleStore } from "@/stores/articles";

const store = useArticleStore();

// console.log(store.articles);
</script>

<style scoped></style>
