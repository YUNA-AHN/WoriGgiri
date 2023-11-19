<template>
  <div>
    <p @click="goprofile">작성자 : {{ comment.username }}</p>
    <p>{{ comment.content }} <button @click="deleteComment">X</button></p>

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
      router.push(`/article/detail/${props.comment.article}`);
    })
    .catch((err) => console.log(err));
};

// 댓글 작성자 프로필로 가기
const goprofile = function () {
  router.push(`/profile/${props.comment.user}`);
};
</script>

<style scoped></style>
