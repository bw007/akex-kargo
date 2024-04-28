<template>
  <el-container>
    <el-header>
      <router-link class="link" to="/">
        <el-icon color="#000000" size="24">
          <Back />
        </el-icon>  
      </router-link>
      <router-link class="logo" to="/">
        <img src="@/assets/imgs/logo.svg" />
      </router-link>
    </el-header>
    <el-divider />
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup></script>

<style lang="css" scoped>
@import url("@/styles/layouts/auth-layout.css");
</style>