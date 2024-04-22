<template>
  <div class="home-layout">
    <el-container class="layout-inner">
      <el-header>
        <el-row justify="space-between" align="middle">
          <el-col :span="2">
            <router-link id="logo" to="/">
              <img src="@/assets/imgs/logo.svg" alt="">
            </router-link>
          </el-col>
          <el-col id="profile" :span="2">
            <router-link to="/auth/signin">
              <UserCircleIcon />
            </router-link>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="layout-main">
        <el-aside width="fit-content">
          <el-menu
            default-active="auth"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-button @click="isCollapse = !isCollapse" text>
              <el-icon>
                <ArrowRight v-if="isCollapse" />
                <ArrowLeft v-else />
              </el-icon>
            </el-button>

            <el-menu-item v-for="item in menu" :index="item.name" :key="item.name" :route="{name: item.name}">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <template #title>{{ item.meta.title }}</template>
            </el-menu-item>

          </el-menu>

        </el-aside>
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import { menu } from "@/stores/utils/menu";
import { UserCircleIcon } from '@heroicons/vue/24/outline'


const isCollapse = ref(false);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style lang="css" scoped>
.home-layout {
  height: 100vh;
}
.layout-inner {
  height: calc(100%);
}
.layout-main {
  height: calc(100% - 60px);
}
.el-header {
  box-shadow: var(--el-box-shadow-lighter);
}
.el-header .el-row {
  height: 100%;
}
.el-row .el-col {
  display: flex;
  align-items: center;
}
#logo {
  display: inline-flex;
  align-items: center;
}
#profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#profile svg {
  width: 24px;
  height: 24px;
  color: #00000075;
}
#profile:hover svg {
  color: #000000;
}
.el-aside {
  
}
.el-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border: none;
}
.el-menu .el-button {
  margin-left: auto;
  width: 63px;
  height: 54px;
  opacity: 0.65;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
}
.el-main {
  background-color: #f2f6fc90;
}
.el-main .el-scrollbar {
  background-color: #ffffff;
}
</style>