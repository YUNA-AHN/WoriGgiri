<template>
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
          <RouterLink :to="{ name: 'signup' }" class="nav-link"
            >Signup</RouterLink
          >
          <span> | </span>
          <RouterLink :to="{ name: 'login' }" class="nav-link"
            >Login</RouterLink
          >
          <span> | </span>
          <RouterLink :to="{ name: 'article' }" class="nav-link"
            >Article</RouterLink
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
