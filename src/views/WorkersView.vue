<template>
  <section>
    <WorkerDialog />
    <el-row class="add-worker" justify="space-between">
      <el-text size="large">{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <el-table :data="filterTableData" style="width: 100%; height: calc(100vh - 180px);">
      <el-table-column fixed type="index" align="center" />
      <el-table-column label="Ism, Familiya" min-width="180" prop="name">
        <template #default="list">
          <el-text tag="b">{{ list.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="Email" min-width="220" prop="email">
        <template #default="list">
          <el-text>{{ list.row.email }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="Qo'shilgan sana" min-width="145" prop="date">
        <template #default="list">
          <el-text>{{ list.row.date }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="Holati" min-width="72" prop="name">
        <template #default="list">
          <el-button :type="list.row.status ? 'success' : 'warning'">
            <el-icon :size="16">
              <LockOpenIcon v-if="list.row.status" />
              <LockClosedIcon v-else />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Lavozim" min-width="125" prop="rank">
        <template #default="list">
          <el-text>{{ list.row.rank }}</el-text>
        </template>
      </el-table-column>
      <el-table-column align="right" min-width="180">
        <template #header>
          <el-input v-model="search" placeholder="Qidirish..." />
        </template>
        <template #default>
          <el-button title="Tahrirlash" :icon="Edit" type="primary" plain />
          <el-button title="O'chirish" :icon="Delete" type="danger" plain />
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { LockClosedIcon, LockOpenIcon } from "@heroicons/vue/24/outline";
import WorkerDialog from '@/components/workers/WorkerDialog.vue';
import { dialogStore } from "@/stores/utils/dialog";

const dialog = dialogStore();

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter((data) =>
    !search.value ||
    data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Abdurahmon Umarov',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Boshqaruvchi'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Operator'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Operator'
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Admin'
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: true,
    rank: 'Admin'
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: true,
    rank: 'Admin'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Operator'
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Admin'
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: true,
    rank: 'Admin'
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: true,
    rank: 'Admin'
  },
])
</script>

<style lang="css" scoped>
section {
  padding: 10px;
}
.add-worker {
  padding-bottom: 10px;
}
</style>