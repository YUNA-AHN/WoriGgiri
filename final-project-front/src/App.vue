<template>
  <nav class="nav-auth">
    <div v-show="username !== null && token !== null" class="logined">
      <div class="greeting">
        <span style="-webkit-text-stroke: 1px cornflowerblue"
          >{{ store.username }}
        </span>
        님 환영합니다.
      </div>
      <div style="display: flex; align-items: center">
        <button class="back btn" @click="back">
          <img
            src="@/assets/back.png"
            style="width: 20px; height: 20px"
            alt=""
          />
          뒤로가기
        </button>
        <RouterLink
          style="padding: 6px 12px; font-weight: bolder"
          :to="{ name: 'profile' }"
          class="nav-link"
          >마이페이지</RouterLink
        >
        <div class="btn" @click="store.logout" style="font-weight: bolder">
          로그아웃
        </div>
      </div>
    </div>
    <div v-show="username === null || token === null" class="sign">
      <button class="back btn" @click="back">
        <img src="@/assets/back.png" style="width: 20px; height: 20px" alt="" />
        뒤로가기
      </button>
      <RouterLink
        :to="{ name: 'signup' }"
        class="nav-link"
        style="font-weight: bolder"
        >회원가입</RouterLink
      >
      <RouterLink
        :to="{ name: 'login' }"
        class="nav-link"
        style="font-weight: bolder"
        >로그인</RouterLink
      >
    </div>
  </nav>
  <div>
    <!-- 네비게이션 바 -->
    <nav class="container-fluid">
      <nav class="nav-container">
        <RouterLink
          :to="{ name: 'main' }"
          class="navbar-brand"
          style="font-size: 40px"
          ><img
            src="@/assets/icon.png"
            style="width: 100%; height: 100%; margin-right: 10px"
            alt=""
          /><span style="padding-bottom: 10px">우리끼리</span></RouterLink
        >
        <div class="navbar-list">
          <RouterLink :to="{ name: 'map' }" class="nav-link"
            >영업점 찾기</RouterLink
          >
          <span> | </span>
          <RouterLink :to="{ name: 'exchange' }" class="nav-link"
            >환율 계산기</RouterLink
          >
          <span> | </span>
          <RouterLink :to="{ name: 'product' }" class="nav-link"
            >예적금 상품</RouterLink
          >
          <span> | </span>

          <RouterLink :to="{ name: 'article' }" class="nav-link"
            >게시판</RouterLink
          >
        </div>
      </nav>
    </nav>
  </div>
  <div class="router-view">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useSignStore } from "@/stores/Sign";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useSignStore();
const router = useRouter();

const { username, token } = storeToRefs(store);

const back = () => {
  router.go(-1);
};
</script>

<style scoped>
.container-fluid {
  background-color: rgb(119, 185, 252);
  color: rgba(255, 255, 255);
  font-weight: bold;
  font-family: "Orbit", sans-serif;
}
.nav-auth {
  height: 40px;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
  margin: 0px 14%;
}
.logined {
  display: flex;
  justify-content: space-between;
  margin: 0px 10px;
}
.greeting {
  display: flex;
  align-items: center;
  margin: 0px 20px;
  font-size: larger;
  font-weight: bolder;
}

.sign {
  display: flex;
  justify-content: end;
  margin: 0px 20px;
}
.sign a {
  margin: 8px;
  font-size: 15px;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  margin: 0px 14%;
  height: 80px;
  padding: 0px;
}

.navbar-brand {
  display: flex;
  margin: 10px 30px;
  font-size: 30px;
  text-align: center;
  align-items: center;
}

.navbar-list {
  display: flex;
  margin: 0px 30px 0px 0px;
}

.navbar-list * {
  display: flex;
  margin: 10px 5px;
  font-size: 20px;
  align-items: center;
}

.router-view {
  margin: 50px 15% 80px;

  /* display: flex; */
  /* align-items: center; */
}
.back {
  font-family: "IBM Plex Sans KR", sans-serif;
  padding: 4px 0px 0px 0px;
  margin-right: 5px;
  font-weight: bolder;
}
</style>
