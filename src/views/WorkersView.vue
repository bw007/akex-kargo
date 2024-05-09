<template>
  <section>
    <WorkerDialog />
    <el-row class="add-worker" justify="space-between">
      <el-text size="large">{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <WorkersTable />
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

import WorkerDialog from '@/components/workers/WorkerDialog.vue';
import WorkersTable from '@/components/workers/WorkersTable.vue';

import { dialogStore } from "@/stores/utils/dialog";
import { userStore } from '@/stores/data/user';

const dialog_store = dialogStore();
const user_store = userStore();

onMounted(() => {
  user_store.getAllUsers();
})

</script>

<style lang="css" scoped>
section {
  padding: 10px;
}
.add-worker {
  padding-bottom: 10px;
}
</style>