<template>
  <section>
    <el-table :data="filterTableData" style="width: 100%; height: calc(100vh - 151px)">
      <el-table-column type="index" align="center" />
      <el-table-column label="Ism, Familiya" prop="name" />
      <el-table-column label="Email" prop="email" />
      <el-table-column label="Qo'shilgan sana" prop="date" />
      <el-table-column label="Holati" prop="name">
        <template #default="list">
          <el-button size="small" style="width: 60px" :type="list.row.status ? 'success' : 'warning'"> {{ list.row.status ? 'Faol' : 'Nofaol' }} </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Lavozim" prop="rank" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" placeholder="Qidirish..." />
        </template>
        <template #default>
          <el-button title="Tahrirlash" :icon="Edit" size="small" type="primary" plain />
          <el-button title="O'chirish" :icon="Delete" size="small" type="danger" plain />
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';

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
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    email: 'someone@gmail.com',
    status: false,
    rank: 'Super admin'
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
    rank: 'Super admin'
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
    rank: 'Super admin'
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
    rank: 'Super admin'
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
    rank: 'Super admin'
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
</style>