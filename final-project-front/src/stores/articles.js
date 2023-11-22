import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore("article", () => {
  const articles = ref([]);
  const API_URL = "http://127.0.0.1:8000";

  const getArticles = function () {
    // onMounted(() => {
    axios({
      method: "get",
      url: `${API_URL}/articles/`,
    })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        articles.value = res.data;
      })
      .catch((err) => console.log(err));
    // });
  };

  return { articles, API_URL, getArticles };
});
