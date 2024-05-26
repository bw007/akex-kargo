<template>
  <section>
    <div class="system-block">
      <el-text>Tizim sozlamalari</el-text>
      <SystemSetting />
    </div>
    <div class="system-block">
      <el-text>Profil</el-text>
      <ProfileComp />
    </div>
  </section>
</template>

<script setup>
import ProfileComp from '@/components/profile/ProfileComp.vue'
import SystemSetting from '@/components/settings/SystemSetting.vue'
</script>

<style lang="css" scoped>
@import url("@/styles/components/settings/setting.css");
</style>