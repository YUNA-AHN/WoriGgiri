import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import MapView from "@/views/MapView.vue";
import ExchangeView from "@/views/ExchangeView.vue";
import ProductListView from "@/views/ProductListView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LogInView from "@/views/LogInView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue"

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
      path: "/detail/:fin_prdt_cd",
      name: "detail",
      component: ProductDetailView,
    },
  ],
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
