<template>
  <div>
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
// onMounted(() => {
//   store;
// });
</script>

<style scoped></style>
