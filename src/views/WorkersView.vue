<template>
  <section>
    <WorkerDialog :id="id" />
    <el-row class="add-worker" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <WorkersTable @edit="handleEdit" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import WorkerDialog from '@/components/workers/WorkerDialog.vue';
import WorkersTable from '@/components/workers/WorkersTable.vue';

import { dialogStore } from "@/stores/utils/dialog";
import { userStore } from '@/stores/data/user';

const dialog_store = dialogStore();
const user_store = userStore();

onMounted(() => {
  user_store.getAllUsers();
})

const id = ref('')

const handleEdit = (_id) => {
  id.value = _id
}

</script>

<style lang="css" scoped>
@import url("@/styles/components/workers/worker.css");
</style>