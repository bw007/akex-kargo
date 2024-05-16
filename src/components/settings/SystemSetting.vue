<template>
  <el-card>
    <template #default>
      <div class="card-header">
        <el-text tag="b">Mavzu:</el-text>
        <el-switch
          v-model="theme"
          :active-action-icon="Moon"
          :inactive-action-icon="SunIcon"
          style="--el-switch-on-color: #95d475"
        />
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { Moon } from '@element-plus/icons-vue';
import { SunIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const theme = ref(false)


</script>

<style lang="css" scoped>
@import url("@/styles/components/settings/system-setting.css");
</style>