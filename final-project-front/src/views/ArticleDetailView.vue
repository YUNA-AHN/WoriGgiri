<template>
  <div>
    <h1>{{ article.title }}</h1>
    <p @click="goprofile">작성자 : {{ article.username }}</p>
    <button @click="deleteArticle">삭제</button> |
    <button @click="goupdate">수정</button>
    <p>
      생성일자 : {{ article.created_at.slice(0, 10) }} 수정일자 :
      {{ article.updated_at.slice(0, 10) }}
    </p>
    <hr />
    <p>{{ article.content }}</p>
  </div>

  <h4>댓글 [{{ article.comment_count }}]</h4>
  <div>
    <h5>댓글 작성</h5>
    <div>
      <form @submit.prevent="createComment">
        <label for="content">내용 : </label>
        <textarea type="text" id="content" v-model.trim="content"></textarea
        ><br />
        <input type="submit" />
      </form>
    </div>
  </div>
  <div>
    <CommentDetail
      v-for="comment in article.comment_set"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useRoute, useRouter } from "vue-router";
import CommentDetail from "@/components/CommentDetail.vue";
import axios from "axios";

// 단일 게시물 가져오기
const route = useRoute();
const router = useRouter();
const articleId = route.params.id;
const articles = useArticleStore().articles;

const article = articles.filter((product) => product.id == articleId)[0];

// console.log(article);

// 게시물 삭제 : 권한 추가 필요
const deleteArticle = function () {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/${article.id}/`,
  })
    .then(() => {
      router.push({ name: "article" });
    })
    .catch((err) => console.log(err));
};

// 게시물 수정 : 권한 추가 필요
const goupdate = function () {
  router.push(`/article/update/${article.id}`);
};

// 댓글 작성 -  새로고침 이슈? / 글 작성자가 작성시 작성자임을 표시 추가했으면..!
const content = ref(null);
const store = useArticleStore();

const createComment = function () {
  axios({
    method: "post",
    url: `${store.API_URL}/articles/createcomments/${article.id}/`,
    data: {
      content: content.value,
    },
  })
    .then(() => {
      router.push(`/article/detail/${article.id}`);
    })
    .catch((err) => console.log(err));
};

// 작성자 프로필로 가기
const goprofile = function () {
  router.push(`/profile/${article.user}`);
};

onMounted(() => {
  store.getArticles();
});
</script>

<style scoped></style>
