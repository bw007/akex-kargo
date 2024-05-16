<template>
  <el-main>
    <el-scrollbar>
      <h2 class="main-title">{{ $route.meta.title }}</h2>
      <RouterView />
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style lang="css" scoped>
@import url("@/styles/components/main/main-comp.css");
</style>