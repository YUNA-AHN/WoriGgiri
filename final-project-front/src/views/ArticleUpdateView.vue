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
import { onMounted, ref } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useSignStore } from "@/stores/sign.js";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { computed } from "@vue/reactivity";

const route = useRoute();
const router = useRouter();
const store = useArticleStore();

const articleId = route.params.id;

const article = store.articles.filter((one) => one.id == articleId);
const title = computed(() => {
  return article[0].title;
});
const content = computed(() => {
  return article[0].content;
});
// const article = ref(
//   store.articles.filter((product) => product.id === articleId)[0]
// );
onMounted(() => {
  // const article = ref(null);
  article.value = store.articles.filter((product) => product.id == articleId);
  // 기존 값 입력해주기

  const token = useSignStore().token;
  // updateArticle - 마찬가지로 새로고침 이슈..
  const updateArticle = function () {
    axios({
      method: "put",
      url: `${store.API_URL}/articles/${article.value.id}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        title: title.value,
        content: content.value,
      },
    })
      .then((res) => {
        router.push(`/article/detail/${article.value.id}`);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
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
