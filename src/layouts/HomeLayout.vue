<template>
  <div class="home-layout">
    <div class="overlay"></div>
    <el-container class="layout-inner">
      <el-header>
        <el-row justify="space-between" align="middle">
          <el-col class="navbar-menu-icon" :span="2">
          sasa
          </el-col>
          <el-col class="navbar-logo" :span="2">
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
            :default-active="$route.name"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @select="handleSelect"
          >
            <el-button @click="isCollapse = !isCollapse" text>
              <el-icon>
                <ArrowRight v-if="isCollapse" />
                <ArrowLeft v-else />
              </el-icon>
            </el-button>

            <el-menu-item 
              v-for="item in menu" 
              :index="item.name" 
              :key="item.name" 
              :route="{name: item.name}"
              :class="$route.name == item.name ? 'active' : ''"
            >
              <el-divider direction="vertical" />
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>

          </el-menu>

        </el-aside>
        <el-main>
          <el-scrollbar>
            <h2 class="main-title">{{ $route.meta.title }}</h2>
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
import router from '@/router';


const isCollapse = ref(false);
const sidebarToggle = ref(false);

const handleSelect = (index) => {
  router.push({ name: index })
}

</script>

<style lang="css" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.6);
  transition: opacity .5s;
  z-index: 7;
  display: none;
}
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
.navbar-menu-icon {
  display: none !important;
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
.el-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: transparent;
  border: none;
  box-shadow: var(--el-box-shadow-lighter);
}
.el-menu-item.active {
  background-color: #f2f6fc;
}
.el-menu-item.active .el-divider {
  background: #79bbff;
}
.el-menu-item .el-divider {
  margin: 0;
  width: 6px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
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
  background-color: #f2f6fc80;
}
.main-title {
  padding: 10px;
  font-size: 1.65rem;
  color: var(--el-text-color-regular);
}

@media only screen and (max-width: 767px) {
  .el-aside {
    background-color: #ffffff;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 99;
    display: none;
  }
  .navbar-menu-icon {
    display: block !important;
  }
  .navbar-logo {
    display: none !important;
  }
}
</style>