<template>
  <div class="home-layout">
    <Transition>
      <div v-if="isToggle" @click="isToggle = false" class="el-overlay"></div>
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
@import url("@/styles/layouts/main-layout.css");
</style>