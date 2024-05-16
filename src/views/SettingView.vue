<template>
  <section>
    <!-- <RouterView /> -->
    <SystemSetting />
    <el-text>Profil</el-text>
    <ProfileSetting />
  </section>
</template>

<script setup>
// import { RouterView } from 'vue-router';
import ProfileSetting from '@/components/setting/ProfileSetting.vue'
import SystemSetting from '@/components/setting/SystemSetting.vue'
</script>

<style lang="css" scoped>
@import url("@/styles/components/settings/setting.css");
</style>