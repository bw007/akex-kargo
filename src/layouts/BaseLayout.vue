<template>
  <div class="home-layout">
    <Transition>
      <div v-if="sidebarToggle" @click="trigger_store.setSidebarToggle(false)" class="el-overlay"></div>
    </Transition>
    <el-container class="layout-inner">
      <SidebarPart />
      <el-container direction="vertical" class="layout-main">
        <HeaderPart />
        <MainPart />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import HeaderPart from '@/components/base/HeaderComp.vue';
import SidebarPart from '@/components/base/SidebarComp.vue';
import MainPart from '@/components/base/MainComp.vue';
import { triggerStore } from '@/stores/utils/trigger';

const trigger_store = triggerStore();
const { sidebarToggle } = storeToRefs(trigger_store)

</script>

<style lang="css" scoped>
@import url("@/styles/layouts/base-layout.css");
</style>