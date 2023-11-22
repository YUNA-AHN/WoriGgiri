<template>
  <div>
    <h1>📝 게시판</h1>
    <div class="article-list-header">
      <h2>Article List</h2>
      <RouterLink class="btn" :to="{ name: 'articlecreate' }"
        >게시물 생성</RouterLink
      >
    </div>
    <div v-for="article in articles">
      <div @click="godetail(article)">
        <h5>{{ article.title }} [{{ article.comment_count }}]</h5>
        <p
          style="
            font-size: smaller;
            color: gray;
            font-weight: lighter;
            margin: 0px 0px;
          "
        >
          {{ article.created_at.slice(0, 10) }} {{ article.username }}
        </p>
        <hr />
      </div>
    </div>
    <!-- <ArticleList /> -->
  </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articles";
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted, onUpdated } from "vue";
import axios from "axios";

const store = useArticleStore();
const articles = ref(null);

const router = useRouter();
const godetail = function (article) {
  router.push(`/article/detail/${article.id}`);
};
onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/articles/`,
  })
    .then((res) => {
      articles.value = res.data;
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
.article-list-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  width: 150px;
  height: 50px;
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(80, 80, 80);
  font-size: 20px;
}
</style>
