<template></template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  article: Object,
});

const router = useRouter();
const godetail = function (article) {
  router.push(`/article/detail/${article.id}`);
};
</script>

<style scoped></style>
