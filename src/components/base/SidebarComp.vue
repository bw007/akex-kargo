<template>
  <el-aside :class="{ open: sidebarToggle }" width="fit-content">
    <el-menu 
      :default-active="$route.name" 
      class="el-menu-vertical-demo" 
      :collapse="sidebarCollapse"
      @select="handleSelect"
    >
      <el-button
        @click="sidebarToggle ? trigger_store.setSidebarToggle(false) : trigger_store.setSidebarCollapse(!sidebarCollapse)" 
        text
      >
        <el-icon>
          <ArrowRight v-if="sidebarCollapse" />
          <ArrowLeft v-else />
        </el-icon>
      </el-button>
      <el-menu-item 
        v-for="item in superMenu"
        :index="item.name"
        :key="item.name"
        :route="{ name: item.name }"
        :class="{ 'is-active': $route.name.toLowerCase().includes(item.name.toLowerCase()) }"
        :disabled="!item.meta.view"
      >
        <el-divider direction="vertical" />
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { computed } from 'vue';
import router from '@/router';
import { triggerStore } from '@/stores/utils/trigger';
import { storeToRefs } from 'pinia';
import { menu } from '@/stores/utils/menu';
import { authStore } from '@/stores/auth/auth';

const trigger_store = triggerStore();
const { sidebarToggle, sidebarCollapse } = storeToRefs(trigger_store);

const auth_store = authStore();
const { user } = storeToRefs(auth_store)

const superMenu = computed(() => {
  if (user.value.role !== "@super_admin") {
    return [ ...menu.filter(m => m.name !== "Workers") ]
  } else {
    return [ ...menu ]
  }
})

const handleSelect = (index) => {
  router.push({ name: index });
  trigger_store.setSidebarToggle(false);
}

</script>

<style lang="css" scoped>
@import url("@/styles/components/base/sidebar.css");
</style>