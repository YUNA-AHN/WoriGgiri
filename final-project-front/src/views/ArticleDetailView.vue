<template>
  <div>
    <h1>{{ article?.title }}</h1>
    <p>작성자 : {{ article?.username }}</p>
    <div v-if="is_article">
      <button @click="deleteArticle">삭제</button> |
      <button @click="goupdate">수정</button>
    </div>

    <p>
      생성일자 : {{ article?.created_at.slice(0, 10) }} 수정일자 :
      {{ article?.updated_at.slice(0, 10) }}
    </p>
    <hr />
    <p>{{ article?.content }}</p>
  </div>

  <p v-if="is_like" @click="clicklikes">❤</p>
  <p v-else @click="clicklikes">🤍</p>
  <h4>좋아요 {{ article?.like_count }}개</h4>
  <h4>댓글 [{{ article?.comment_count }}]</h4>
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
      v-for="comment in article?.comment_set"
      :key="comment.id"
      :comment="comment"
      @comment-id="getId"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign.js";
import { useRoute, useRouter } from "vue-router";
import CommentDetail from "@/components/CommentDetail.vue";
import axios from "axios";

// 단일 게시물 가져오기
const route = useRoute();
const router = useRouter();

const articleId = route.params.id;

const store = useArticleStore();

const article = ref(
  store.articles.filter((product) => product.id == articleId)[0]
);

// 게시물 삭제
const deleteArticle = function () {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/${articleId}/`,
  })
    .then(() => {
      router.push({ name: "article" });
    })
    .catch((err) => console.log(err));
};

// 게시물 수정
const goupdate = function () {
  router.push(`/article/update/${articleId}`);
};

// 댓글 작성 - 글 작성자가 작성시 작성자임을 표시 추가했으면..!
const content = ref(null);
const token = useSignStore().token;

const createComment = function () {
  axios({
    method: "post",
    url: `${store.API_URL}/articles/createcomments/${articleId}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      content: content.value,
    },
  })
    .then((res) => {
      router.push(`/article/detail/${articleId}`);
      console.log("댓글이 생성되었습니다.");
      // console.log(res.data);
      article.value.comment_set.push(res.data);
      article.value.comment_count += 1;
      article.value = { ...article.value };
      content.value = "";
    })
    .catch((err) => console.log(err));
};

// 댓글 삭제
const getId = function (args) {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/comments/${args}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then(() => {
      router.push(`/article/detail/${articleId}`);
      console.log("댓글이 삭제되었습니다.");
      article.value.comment_set = article.value.comment_set.filter(
        (comment) => comment.id != args
      );
      article.value.comment_count -= 1;
      // console.log(article.value.comment_set);
    })
    .catch((err) => console.log(err));
};

// 좋아요 기능 추가
const user = useSignStore().username;

const is_like = ref(null);

const check_like = function () {
  if (article.value.like_users.includes(user)) {
    is_like.value = true;
    console.log("좋아용");
  } else {
    is_like.value = false;
    console.log("안좋아용");
  }
};

const clicklikes = function () {
  axios({
    method: "post",
    url: `${store.API_URL}/articles/${articleId}/likes/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then(() => {
      router.push(`/article/detail/${articleId}`);
      is_like.value = !is_like.value;
      if (is_like.value) {
        article.value.like_count += 1;
      } else {
        article.value.like_count -= 1;
      }
    })
    .catch((err) => console.log(err));
};

// 작성자인지 체크
const is_article = ref(null);

const checkArticleUser = function () {
  if (article.value.username == user) {
    is_article.value = true;
    console.log("글 작성자입니다.");
  } else {
    is_article.value = false;
    console.log("글 작성자가 아닙니다.");
  }
};

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/articles/${articleId}/`,
  })
    .then((res) => {
      // console.log(res.data);
      article.value = res.data;
      check_like();
      checkArticleUser();
      console.log(article.value);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped></style>
