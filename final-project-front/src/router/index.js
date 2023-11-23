import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import MapView from "@/views/MapView.vue";
import ExchangeView from "@/views/ExchangeView.vue";

import ArticleView from "@/views/ArticleView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";
import ArticleCreateView from "@/views/ArticleCreateView.vue";
import ArticleUpdateView from "@/views/ArticleUpdateView.vue";
import LikesArticleView from "@/views/LikesArticleView.vue";

import UserProfileView from "@/views/UserProfileView.vue";

import ProductListView from "@/views/ProductListView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LogInView from "@/views/LogInView.vue";
import UserUpdateView from "@/views/UserUpdateView.vue";
import PasswordChangeView from "@/views/PasswordChangeView.vue";
import UserDeleteView from "@/views/UserDeleteView.vue";

import ProductDetailView from "@/views/ProductDetailView.vue";
import SavingProductDetailView from "@/views/SavingProductDetailView.vue";

import { useSignStore } from "@/stores/Sign";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
    },
    {
      path: "/exchange",
      name: "exchange",
      component: ExchangeView,
    },
    {
      path: "/article",
      name: "article",
      component: ArticleView,
    },
    {
      path: "/article/detail/:id",
      name: "articleDetail",
      component: ArticleDetailView,
    },
    {
      path: "/article/create",
      name: "articlecreate",
      component: ArticleCreateView,
    },
    {
      path: "/article/update/:id",
      name: "articleUpdate",
      component: ArticleUpdateView,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfileView,
    },
    {
      path: "/product",
      name: "product",
      component: ProductListView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LogInView,
    },
    {
      path: "/update",
      name: "update",
      component: UserUpdateView,
    },
    {
      path: "/password",
      name: "password",
      component: PasswordChangeView,
    },
    {
      path: "/delete",
      name: "delete",
      component: UserDeleteView,
    },
    {
      path: "/likesarticle",
      name: "likesarticle",
      component: LikesArticleView,
    },
    {
      path: "/deposit/:fin_prdt_cd",
      name: "deposit",
      component: ProductDetailView,
    },
    {
      path: "/saving/:fin_prdt_cd",
      name: "saving",
      component: SavingProductDetailView,
    },
  ],
});

router.beforeEach((to, from) => {
  const store = useSignStore();
  if (to.name === "article" && !store.isLogin) {
    window.alert("로그인이 필요합니다.");
    return { name: "login" };
  }
  if (to.name === "profile" && !store.isLogin) {
    window.alert("로그인이 필요합니다.");
    return { name: "login" };
  }
});

// import { useCounterStore } from "@/stores/counter";
// import Swal from "sweetalert2";

// router.beforeEach((to, from) => {
//   const store = useCounterStore();
//   if (to.name === "ArticleView" && !store.isLogin) {
//     Swal.fire({
//       title: "로그인이 필요합니다",
//       icon: "error",
//       showConfirmButton: false,
//       showDenyButton: true,
//       denyButtonText: "확인",
//       denyButtonColor: "#F27474",
//     });
//     return { name: "LogInView" };
//   }
//   if ((to.name === "SignUpView" || to.name === "LogInView") && store.isLogin) {
//     Swal.fire({
//       title: "이미 로그인된 사용자입니다",
//       icon: "success",
//       showConfirmButton: true,
//       confirmButtonText: "확인",
//       confirmButtonColor: "#a5dc86",
//     });
//     return { name: "ArticleView" };
//   }
// });

export default router;
