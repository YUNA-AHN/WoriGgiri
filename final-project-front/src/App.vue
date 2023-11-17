<template>
  <div>
    <RouterLink :to="{ name: 'main' }">Main</RouterLink>
    <span> | </span>
    <RouterLink :to="{ name: 'map' }">Map</RouterLink>
    <span> | </span>
    <RouterLink :to="{ name: 'exchange' }">Exchange</RouterLink>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
