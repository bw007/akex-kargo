<template>
  <section>
    <WorkerDialog :id="id" />
    <el-row class="add-worker" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <WorkersTable v-loading="loading" @edit="handleEdit" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import WorkerDialog from '@/components/workers/WorkerDialog.vue';
import WorkersTable from '@/components/workers/WorkersTable.vue';

import { dialogStore } from "@/stores/utils/dialog";
import { userStore } from '@/stores/data/user';
import { loadingStore } from '@/stores/utils/loading';
import { storeToRefs } from 'pinia';

const dialog_store = dialogStore();
const loading_store = loadingStore()
const { loading } = storeToRefs(loading_store)
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