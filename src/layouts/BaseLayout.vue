<template>
  <div class="home-layout">
    <Transition>
      <div v-if="sidebarToggle" @click="trigger_store.setSidebarToggle(false)" class="el-overlay"></div>
    </Transition>
    <el-container class="layout-inner">
      <HeaderPart />
      <el-container class="layout-main">
        <SidebarPart />
        <MainPart />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import HeaderPart from '@/components/main/HeaderPart.vue';
import SidebarPart from '@/components/main/SidebarPart.vue';
import MainPart from '@/components/main/MainPart.vue';
import { triggerStore } from '@/stores/utils/trigger';

const trigger_store = triggerStore();
const { sidebarToggle } = storeToRefs(trigger_store)

</script>

<style lang="css" scoped>
@import url("@/styles/layouts/base-layout.css");
</style>