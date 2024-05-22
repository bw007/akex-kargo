<template>
  <el-header>
    <el-row justify="space-between" align="middle">
      <el-icon 
        @click="trigger_store.setSidebarToggle(true), trigger_store.setSidebarCollapse(false)" 
        id="navbar-menu-icon" 
        :size="24" 
        color="#00000095"
      >
        <Bars3BottomLeftIcon />
      </el-icon>
      <router-link id="navbar-logo" to="/">
        <img src="@/assets/imgs/logo.svg" alt="">
      </router-link>
      <el-popover 
        @before-enter="isActive = true" 
        @before-leave="isActive = false" 
        :show-after="100" 
        :hide-after="100" 
        placement="bottom-end" 
        :width="280" 
        trigger="click"
      >
        <template #reference>
          <el-avatar :class="{ active: isActive }" id="navbar-profile" :src="user.avatar?.response?.data">
            {{ user.avatar?.response ? "" : user.name?.first.slice(0, 1) }}
          </el-avatar>
        </template>
        <template #default>
          <el-row class="user-info">
            <el-col :span="4">
              <el-avatar :src="user.avatar?.response?.data">
                {{ user.avatar?.response ? "" : user.name?.first.slice(0, 1) }}
              </el-avatar>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col>
                  <el-text tag="b">{{ user.name?.first }} {{ user.name?.last }}</el-text>
                </el-col>
                <el-col>
                  <el-text size="small">{{ user.email }}</el-text>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="profil-menu">
            <el-col>
              <router-link class="profil-link" to="/settings">
                <el-icon :size="18" color="#303133">
                  <Cog8ToothIcon />
                </el-icon>
                Profil
              </router-link>
            </el-col>
            <el-col>
              <router-link 
                @click="cookies.remove('token'), cookies.remove('user-id')" 
                class="profil-link" 
                to="/auth/signin"
              >
                <el-icon :size="18" color="#303133">
                  <ArrowRightStartOnRectangleIcon />
                </el-icon>
                Chiqish
              </router-link>
            </el-col>
          </el-row>
        </template>
      </el-popover>
    </el-row>
  </el-header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import cookies from "vue-cookies";
import { triggerStore } from '@/stores/utils/trigger';
import { Bars3BottomLeftIcon, ArrowRightStartOnRectangleIcon, Cog8ToothIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { authStore } from '@/stores/auth/auth';

const auth_store = authStore();
const trigger_store = triggerStore();

const { user } = storeToRefs(auth_store);

const isActive = ref(false);
const userId = ref(cookies.get("user-id"));

onMounted(() => {
  auth_store.getUser(userId.value)
})

</script>

<style lang="css" scoped>
@import url("@/styles/components/main/header.css");
</style>