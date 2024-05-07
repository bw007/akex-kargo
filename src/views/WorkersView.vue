<template>
  <section>
    <WorkerDialog />
    <el-row class="add-worker" justify="space-between">
      <el-text size="large">{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <el-table :data="filterTableData" style="width: 100%; height: calc(100vh - 180px);">
      <el-table-column fixed type="index" align="center" />
      <el-table-column label="Ism, Familiya" min-width="180" prop="firstName">
        <template #default="list">
          <el-text tag="b">{{ list.row.firstName }} {{ list.row.lastName }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="Email" min-width="220" prop="email">
        <template #default="list">
          <el-text>{{ list.row.email }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="Qo'shilgan sana" min-width="145" prop="createdTime">
        <template #default="list">
          <el-text>{{ list.row.createdTime }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="Holati" min-width="72" prop="status">
        <template #default="list">
          <el-button :disabled="![0, 1].includes(list.row.role)" :type="list.row.status ? 'success' : 'warning'">
            <el-icon :size="16">
              <LockOpenIcon v-if="list.row.status" />
              <LockClosedIcon v-else />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Lavozim" min-width="125" prop="role">
        <template #default="list">
          <el-text v-if="list.row.role == 1">Operator</el-text>
          <el-text v-else-if="list.row.role == 0">Admin</el-text>
          <el-text type="success" v-else>Super Admin</el-text>
        </template>
      </el-table-column>
      <el-table-column align="right" min-width="180">
        <template #header>
          <el-input v-model="search" placeholder="Qidirish..." />
        </template>
        <template #default="list">
          <el-button :disabled="![0, 1].includes(list.row.role)" title="Tahrirlash" :icon="Edit" type="primary" plain />
          <el-button :disabled="![0, 1].includes(list.row.role)" title="O'chirish" :icon="Delete" type="danger" plain />
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { LockClosedIcon, LockOpenIcon } from "@heroicons/vue/24/outline";
import WorkerDialog from '@/components/workers/WorkerDialog.vue';
import { dialogStore } from "@/stores/utils/dialog";
import { userStore } from '@/stores/data/user';
import { storeToRefs } from 'pinia';

const dialog = dialogStore();
const user_store = userStore();
const { users } = storeToRefs(user_store);

const search = ref('')
const filterTableData = computed(() =>
  users.value.filter((data) =>
    !search.value ||
    (data.firstName + data.lastName).toLowerCase().includes(search.value.toLowerCase())
  )
)

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