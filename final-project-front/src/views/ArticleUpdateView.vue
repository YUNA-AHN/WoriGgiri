<template>
  <div>
    <h1>게시글 수정</h1>

    <form class="form-floating" @submit.prevent="updateArticle">
      <div class="wrap-container">
        <div class="form-floating">
          <input
            class="form-control"
            type="text"
            id="floatingInputValue"
            placeholder="제목"
            v-model.trim="title"
          />
          <label for="floatingInputValue" style="font-size: 20px">제목</label>
        </div>
        <input class="btn" type="submit" value="수정" />
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          type="text"
          id="floatingTextarea"
          placeholder=""
          v-model.trim="content"
        ></textarea>
        <label for="floatingTextarea" style="font-size: 20px"
          >내용을 입력하세요</label
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
// import { storeToRefs } from "pinia";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const articleId = route.params.id;
const store = useArticleStore();

const title = ref(null);
const content = ref(null);

const token = useSignStore().token;
// updateArticle
const updateArticle = function () {
  axios({
    method: "put",
    url: `${store.API_URL}/articles/${articleId}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      title: title.value,
      content: content.value,
    },
  })
    .then((res) => {
      router.push(`/article/detail/${articleId}`);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

const article = ref(null);
onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/articles/${articleId}/`,
  })
    .then((res) => {
      article.value = res.data;
      // console.log(article.value);
      title.value = article.value.title;
      content.value = article.value.content;
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
.wrap-container {
  display: flex;
  justify-content: space-between;
}
.form-control {
  border-top: white;
  border-left: white;
  border-right: white;
  border-bottom: 1px solid rgb(119, 185, 252);
  border-radius: 0px;
  margin: 0px 0px 10px 0px;
}
label {
  height: 60px;
}
#floatingTextarea {
  width: 100%;
  height: 400px;
  padding-top: 40px;
}
#floatingInputValue {
  width: 100%;
  height: 70px;
}
.wrap-container div {
  width: 50%;
}
.btn {
  width: 150px;
  height: 50px;
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(80, 80, 80);
  font-size: 20px;
}
</style>
