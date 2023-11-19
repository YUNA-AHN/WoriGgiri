<template>
  <div @click="godetail(article)">
    <h5>{{ article.id }} | {{ article.title }}</h5>
    <hr />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  article: Object,
});

const route = useRouter();
const godetail = function (article) {
  route.push(`/articledetail/${article.id}`);
};
</script>

<style scoped></style>
