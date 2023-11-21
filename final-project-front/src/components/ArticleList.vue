<template>
  <div>
    <ArticleListItem
      v-for="article in articles"
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
