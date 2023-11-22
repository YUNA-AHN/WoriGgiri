<template>
  <div>
    <h2>작성한 게시글</h2>
    <div style="margin-bottom: 40px">
      <div v-if="myarticles?.length > 0">
        <div v-for="myarticle in myarticles">
          <p @click="godetail(myarticle.id)">{{ myarticle?.title }}</p>
          <hr />
        </div>
      </div>
      <div v-else>
        <p>작성한 게시글이 없습니다.</p>
      </div>
    </div>

    <h2>작성한 댓글</h2>
    <div style="margin-bottom: 40px">
      <div v-if="mycomments?.length > 0">
        <div v-for="comment in mycomments">
          <p @click="godetail(comment.article)">{{ comment?.content }}</p>
          <hr />
        </div>
      </div>
      <div v-else>
        <p>작성한 댓글이 없습니다.</p>
      </div>
    </div>

    <h2>좋아요한 게시글</h2>
    <div v-if="like_articles?.length > 0">
      <div v-for="article in like_articles">
        <p @click="godetail(article.id)">{{ article?.title }}</p>
        <hr />
      </div>
    </div>
    <div v-else>
      <p>좋아요한 게시글이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSignStore } from "@/stores/sign.js";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const store = useSignStore();
const mylog = ref(null);
const myarticles = ref(null);
const mycomments = ref(null);
const like_articles = ref(null);
const router = useRouter();

const godetail = function (id) {
  router.push(`/article/detail/${id}`);
};

onMounted(() => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/articles/like_articles/`,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((res) => {
      // console.log(res.data);
      mylog.value = res.data;
      myarticles.value = mylog.value.article_set;
      mycomments.value = mylog.value.comments;
      like_articles.value = mylog.value.like_articles;
      console.log(mycomments);
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

h2 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}
</style>
