<template>
  <el-table empty-text="Ma'lumot yo'q" :data="filterOrderData" style="width: 100%; height: calc(100vh - 200px);">
    <el-table-column fixed type="index" width="40" align="center"></el-table-column>
    <el-table-column label="To'lov miqdori" min-width="140"></el-table-column>
    <el-table-column label="Mahsulot nomi" min-width="160"></el-table-column>
    <el-table-column label="To'lov vaqti" min-width="120"></el-table-column>
    <el-table-column label="Buyurtmachi" min-width="140"></el-table-column>
    <el-table-column align="right" min-width="120">
      <template #header>
        <el-input v-model="search" placeholder="Qidirish..." />
      </template>
      <template #default="list">
        <el-button class="edit" @click="edit(list.row.id)" size="small" title="Tahrirlash" icon="Edit" type="primary" plain />
        <router-link class="profil-link" :to="{ name: 'ordersId', params: { id: list.row.id } }">
          <el-button size="small" title="Ko'rish" icon="View" type="success" plain />
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, ref } from 'vue';

const filterOrderData = computed(() =>
  tableData.value.filter((data) =>
    !search.value ||
    (data.name + data.owner).toLowerCase().includes(search.value.toLowerCase())
  )
)

const tableData = ref([
  
])

const search = ref('')
</script>

<style lang="css" scoped>
  
</style>