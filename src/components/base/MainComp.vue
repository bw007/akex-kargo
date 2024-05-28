<template>
  <el-main>
    <el-scrollbar>
      <el-text tag="b" size="large">{{ $route.meta.title }}</el-text>
      <RouterView />
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style lang="css" scoped>
@import url("@/styles/components/base/main.css");
</style>