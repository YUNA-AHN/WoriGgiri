<template>
  <div>
    <p>작성자 : {{ comment.username }}</p>
    <p>
      {{ comment.content }}
      <button v-if="checkUser" @click="commentId">X</button>
    </p>

    <hr />
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed, onMounted } from "vue";
import { useSignStore } from "@/stores/sign.js";

const props = defineProps({
  comment: Object,
});

// 댓글 삭제 : 권한 추가 필요

const emit = defineEmits(["commentId"]);
const commentId = function () {
  emit("commentId", props.comment.id);
};

// console.log(props.comment.username);

const user = useSignStore().username;

const checkUser = computed(() => {
  if (props.comment.username == user) {
    return true;
  } else {
    return false;
  }
});
</script>

<style scoped></style>
