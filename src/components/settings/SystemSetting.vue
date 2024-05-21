<template>
  <el-card>
    <template #default>
      <el-row class="card-header">
        <el-col>
          <el-text tag="b">Yuqori qism:</el-text>
          <el-switch
            v-model="theme.header"
            :active-action-icon="Moon"
            :inactive-action-icon="SunIcon"
            style="--el-switch-on-color: #95d475"
          />
        </el-col>
        <el-col>
          <el-text tag="b">Yon panel:</el-text>
          <el-switch
            @change="handleChange"
            v-model="theme.sidebar"
            :active-action-icon="Moon"
            :inactive-action-icon="SunIcon"
            style="--el-switch-on-color: #95d475"
          />
        </el-col>
        <el-col>
          <el-text tag="b">Asosiy qism:</el-text>
          <el-switch
            v-model="theme.main"
            :active-action-icon="Moon"
            :inactive-action-icon="SunIcon"
            style="--el-switch-on-color: #95d475"
          />
        </el-col>
      </el-row>
    </template>
  </el-card>
</template>

<script setup>
import { Moon } from '@element-plus/icons-vue';
import { SunIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const theme = ref({})
const handleChange = (val) => {
  console.log(val);
}

</script>

<style lang="css" scoped>
@import url("@/styles/components/settings/system-setting.css");
</style>