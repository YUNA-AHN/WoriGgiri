<template>
  <div>
    <h1>{{ article?.title }}</h1>
    <div class="detail-header">
      <p>작성자 : {{ article?.username }}</p>

      <div v-if="is_article">
        <button id="btn" class="btn btn-info" @click="goupdate">수정</button>
        <span> | </span>
        <button id="btn" class="btn" @click="deleteArticle">삭제</button>
      </div>
    </div>
    <p>
      생성일자 : {{ article?.created_at.slice(0, 10) }} 수정일자 :
      {{ article?.updated_at.slice(0, 10) }}
    </p>
    <hr />
    <div class="article-container">
      <p>{{ article?.content }}</p>
    </div>
  </div>
  <hr />
  <div class="sub-container mb-3">
    <h4 class="">댓글 {{ article?.comment_count }} 개</h4>
    <span class="mx-2" style="font-size: 20px">|</span>
    <h4>좋아요 {{ article?.like_count }} 개</h4>
  </div>

  <div>
    <div class="sub-content">
      <h5 class="mt-2 me-2" style="margin-left: 0px">댓글 작성</h5>
      <p
        class="my-1 heart"
        style="font-size: 21px"
        v-if="is_like"
        @click="clicklikes"
      >
        💖
      </p>
      <p class="my-1 heart" style="font-size: 21px" v-else @click="clicklikes">
        🤍
      </p>
    </div>
    <div class="comment-form">
      <form @submit.prevent="createComment">
        <div class="form-floating">
          <input
            class="form-control"
            type="text"
            id="floatingInputValue"
            placeholder="내용을 입력하세요"
            v-model.trim="content"
          />
          <label for="floatingInputValue">내용을 입력하세요</label>
        </div>
        <input id="comment-btn" class="btn" type="submit" value="작성" />
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

// 게시물 삭제 : 권한 추가 필요
const deleteArticle = function () {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/${articleId}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then(() => {
      router.push({ name: "article" });
    })
    .catch((err) => console.log(err));
};

// 게시물 수정 : 권한 추가 필요
const goupdate = function () {
  router.push(`/article/update/${articleId}`);
};

// 댓글 작성 -  새로고침 이슈? / 글 작성자가 작성시 작성자임을 표시 추가했으면..!
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

// console.log(article.value);
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

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
  font-weight: bolder;
}
h1 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}

.form-control {
  border-top: white;
  border-left: white;
  border-right: white;
  border-bottom: 1px solid rgb(119, 185, 252);
  border-radius: 0px;
  margin: 0px 0px 10px 0px;
  width: 400px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
}

.article-container {
  width: 100%;
  height: 300px;
  border: 1px solid lightgray;
  padding: 10px;
}
form {
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 0px;
}

#btn {
  width: 100px;
  height: 40px;
  border: 1px solid rgba(119, 185, 252, 0.1);
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(60, 60, 60);
  font-size: 17px;
  font-weight: bolder;
}

#comment-btn {
  width: 70px;
  margin-left: 10px;
  border: 1px solid rgba(119, 185, 252, 0.1);
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(60, 60, 60);
  font-size: 17px;
  font-weight: bolder;
}

.sub-container {
  display: flex;
}
.sub-content {
  display: flex;
}

.heart {
  padding: 0px;
  cursor: pointer;
}
</style>
