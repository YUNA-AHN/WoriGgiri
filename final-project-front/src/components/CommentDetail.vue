<template>
  <div>
    <p @click="goprofile">작성자 : {{ comment.username }}</p>
    <p>{{ comment.content }} <button @click="commentId">X</button></p>

    <hr />
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "@/stores/articles";
import axios from "axios";

const props = defineProps({
  comment: Object,
});

// 댓글 삭제 : 권한 추가 필요
const store = useArticleStore();
const router = useRouter();

const emit = defineEmits(["commentId"]);
const commentId = function () {
  emit("commentId", props.comment.id);
};

// console.log(article);

const deleteComment = function () {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/comments/${props.comment.id}/`,
  })
    .then(() => {
      router.push(`/article/detail/${props.comment.article}`);
      console.log("댓글이 삭제되었습니다.");
      delcomment();
      // article.value.comment_set.filter(
      //   (comment) => comment.id != props.comment.id
      // );
      // article.value.comment_count -= 1;
    })
    .catch((err) => console.log(err));
};

// 댓글 작성자 프로필로 가기
const goprofile = function () {
  router.push(`/profile/${props.comment.user}`);
};
</script>

<style scoped></style>
