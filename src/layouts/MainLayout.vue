<template>
  <div class="home-layout">
    <Transition>
      <div v-if="isToggle" @click="isToggle = false" class="overlay"></div>
    </Transition>
    <el-container class="layout-inner">
      <el-header>
        <el-row justify="space-between" align="middle">
          <el-col @click="isCollapse = false, isToggle = true" id="navbar-menu-icon" :span="2">
            <el-icon :size="24" color="#00000095">
              <Bars3BottomLeftIcon />
            </el-icon>
          </el-col>
          <el-col id="navbar-logo" :span="2">
            <router-link to="/">
              <img src="@/assets/imgs/logo.svg" alt="">
            </router-link>
          </el-col>
          <el-col id="navbar-profile" :span="12">
            <el-popover @before-enter="isActive = true" @before-leave="isActive = false" :show-after="100" :hide-after="100" placement="bottom-end" :width="280" trigger="click">
              <template #reference>
                <el-avatar :class="isActive ? 'active' : ''">L</el-avatar>
              </template>
              <template #default>
                <el-row class="profil-items" :gutter="7">
                  <el-col :span="5">
                    <el-avatar>L</el-avatar>
                  </el-col>
                  <el-col :span="18">
                    <el-row>
                      <el-col>
                        <el-text tag="b">Laziz Hasanov</el-text>
                      </el-col>
                      <el-col>
                        <el-text size="small">mr.abdulaziz00791@gmail.com</el-text>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="profil-items profil-menu">
                  <el-col>
                    <router-link class="profil-link" to="/setting">
                      <el-icon :size="18" color="#303133">
                        <Cog8ToothIcon />
                      </el-icon>
                      Profil
                    </router-link>
                  </el-col>
                  <el-col>
                    <router-link class="profil-link" to="/auth/signin">
                      <el-icon :size="18" color="#303133">
                        <ArrowRightStartOnRectangleIcon />
                      </el-icon>
                      Chiqish
                    </router-link>
                  </el-col>
                </el-row>
              </template>
            </el-popover>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="layout-main">
        <el-aside :class="isToggle ? 'open' : ''" width="fit-content">
          <el-menu :default-active="$route.name" class="el-menu-vertical-demo" :collapse="isCollapse"
            @select="handleSelect">
            <el-button @click="isToggle ? isToggle = false : isCollapse = !isCollapse" text>
              <el-icon>
                <ArrowRight v-if="isCollapse" />
                <ArrowLeft v-else />
              </el-icon>
            </el-button>
            <el-menu-item v-for="item in menu" :index="item.name" :key="item.name" :route="{ name: item.name }"
              :class="$route.name == item.name ? 'active' : ''">
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
import { Bars3BottomLeftIcon, ArrowRightStartOnRectangleIcon, Cog8ToothIcon } from '@heroicons/vue/24/outline';
import router from '@/router';

const isCollapse = ref(false);
const isToggle = ref(false);
const isActive = ref(false);

const handleSelect = (index) => {
  router.push({ name: index });
  isToggle.value = false;
}

</script>

<style lang="css" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  transition: opacity .5s;
  z-index: 7;
  display: none;
}

.v-enter-active.overlay,
.v-leave-active.overlay {
  transition: opacity 0.5s ease;
}

.v-enter-from.overlay,
.v-leave-to.overlay {
  opacity: 0;
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

#navbar-menu-icon {
  display: none !important;
}

#navbar-logo a,
#navbar-profile a {
  display: inline-flex;
  align-items: center;
}

#navbar-menu-icon,
#navbar-profile {
  cursor: pointer;
}

#navbar-menu-icon:active,
#navbar-profile:active {
  opacity: 0.8;
}

#navbar-profile {
  justify-content: flex-end;
}

.profil-menu {
  padding-top: 10px;
}

.profil-items {
  margin: 8px 0;
}

.profil-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px;
  text-decoration: none;
  width: 100%;
  color: var(--el-menu-text-color);
  transition: background-color .2s cubic-bezier(.19, 1, .22, 1);
  border-radius: 4px;
}

.profil-link:hover {
  background-color: #f2f6fc;
}

.profil-link:active {
  background-color: #d9dce0;
}

.el-avatar {
  background-color: #59656D;
  font-size: 1.4rem;
}
.el-avatar.active {
  box-shadow: 0 0 0px 4px #dedfe0;
}

.el-aside {
  transition: background-color .2s, opacity .25s, transform .5s cubic-bezier(.19, 1, .22, 1);
}

.el-aside.open {
  transform: translate(0);
  opacity: 1;
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
  padding: 10px;
}

.main-title {
  padding: 10px;
  font-size: 1.45rem;
  color: var(--el-text-color-regular);
}

@media only screen and (max-width: 767px) {
  .overlay {
    display: block;
  }

  .el-aside {
    background-color: #ffffff;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    transform: translate(-100%);
    opacity: 0;
    z-index: 99;
  }

  #navbar-menu-icon {
    display: flex !important;
    align-items: center;
  }

  #navbar-logo {
    display: none !important;
  }
}
</style>