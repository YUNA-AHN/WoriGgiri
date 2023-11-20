<template>
  <div>
    <p>작성자 : {{ comment.username }}</p>
    <p>{{ comment.content }} <button @click="commentId">X</button></p>

    <hr />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  comment: Object,
});

// 댓글 삭제 : 권한 추가 필요

const emit = defineEmits(["commentId"]);
const commentId = function () {
  emit("commentId", props.comment.id);
};
</script>

<style scoped></style>
