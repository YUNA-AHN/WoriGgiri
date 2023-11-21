<template>
  <nav class="nav-auth">
    <div v-if="store.username !== null && store.token !== null" class="logined">
      <div class="greeting">{{ store.username }} 님 환영합니다.</div>
      <div class="btn" @click="store.logout">로그아웃</div>
    </div>
    <div v-else class="sign">
      <RouterLink :to="{ name: 'signup' }" class="nav-link"
        >회원가입</RouterLink
      >
      <RouterLink :to="{ name: 'login' }" class="nav-link">로그인</RouterLink>
    </div>
  </nav>
  <div>
    <!-- 네비게이션 바 -->
    <nav>
      <nav class="container-fluid">
        <a class="navbar-brand" href="#">은행프젝</a>
        <div class="navbar-list">
          <RouterLink :to="{ name: 'main' }" class="nav-link">Main</RouterLink>
          <span> | </span>
          <RouterLink :to="{ name: 'map' }" class="nav-link">Map</RouterLink>
          <span> | </span>
          <RouterLink :to="{ name: 'exchange' }" class="nav-link"
            >Exchange</RouterLink
          >
          <span> | </span>
          <RouterLink :to="{ name: 'product' }" class="nav-link"
            >Product</RouterLink
          >
          <span> | </span>

          <RouterLink :to="{ name: 'article' }" class="nav-link"
            >Article</RouterLink
          >

          <span> | </span>
          <RouterLink :to="{ name: 'profile' }" class="nav-link"
            >Profile</RouterLink
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
const store = useSignStore();

const logout = () => {
  const payload = {};
};
</script>

<style scoped>
.container-fluid {
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding: 0px;
  background-color: rgb(119, 185, 252);
  color: rgba(255, 255, 255);
  font-weight: bold;
  font-family: "Orbit", sans-serif;
}
.nav-auth {
  height: 40px;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
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
  margin: 80px 100px;

  /* display: flex; */
  /* align-items: center; */
}
</style>
