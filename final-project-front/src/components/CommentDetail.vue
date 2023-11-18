<template>
  <div>
    <p>작성자 : {{ comment.user }}</p>
    <p>{{ comment.content }}</p>
    <button @click="deleteComment">X</button>
    <hr />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useArticleStore } from "@/stores/articles";
import axios from "axios";
const props = defineProps({
  comment: Object,
});

// 댓글 삭제 : 권한 추가 필요
// ReferenceError: article is not defined ??
const store = useArticleStore();
const router = useRouter();

const deleteComment = function () {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/comments/${props.comment.id}/`,
  })
    .then(() => {
      router.push(`/detail/${article.id}`);
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped></style>
