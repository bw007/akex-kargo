<template>
  <el-table empty-text="Ma'lumot yo'q" :data="filterOrderData" style="width: 100%; height: calc(100vh - 200px);">
    <el-table-column fixed type="index" align="center" />
    <el-table-column label="Buyurtmachi" min-width="160" prop="firstName">
      <template #default="list">
        <el-text tag="b">{{ list.row.firstName }} {{ list.row.lastName }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="ID" prop="id">
      <template #default="list">
        <el-text type="primary">#{{ list.row.phone.slice(4, 9) }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Mahsulot nomi" min-width="180" prop="name">
      <template #default="list">
        <el-text>{{ list.row.name }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Qabul sanasi" min-width="145" prop="createdTime">
      <template #default="list">
        <el-text>{{ list.row.createdTime }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Telefon raqami" min-width="130" prop="status">
      <template #default="list">
        <el-text>
          ({{ list.row.phone.slice(0, 2) }})
          {{ list.row.phone.slice(2, 5) }}-{{ list.row.phone.slice(5, 7) }}-{{ list.row.phone.slice(7, 9) }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column label="Narxi" prop="price" min-width="120">
      <template #default="list">
        <el-text>{{ list.row.price.toLocaleString() }}</el-text>          
      </template>
    </el-table-column>
    <el-table-column label="Holati" min-width="125" prop="role">
      <template #default="list">
        <el-text v-if="list.row.status == 0">Yangi</el-text>
        <el-text v-if="list.row.status == 1">Jarayonda</el-text>
        <el-text v-if="list.row.status == 2">Bekor qilingan</el-text>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="145">
      <template #header>
        <el-input v-model="search" placeholder="Qidirish..." />
      </template>
      <template #default="list">
        <router-link class="profil-link" :to="{ name: 'workersProfile', params: { id: list.row.id } }">
          <el-text type="primary">
            Havola
            <el-icon size="12">
              <top-right />
            </el-icon>
          </el-text>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { convertDate } from '@/stores/utils/helper';
import { orderStore } from '@/stores/data/order';

const order_store = orderStore()
const { orders } = storeToRefs(order_store)

const search = ref('')

const filterOrderData = computed(() =>
  ordersData.value.filter((data) =>
    !search.value ||
    (data.firstName + data.lastName).toLowerCase().includes(search.value.toLowerCase())
  )
)

const ordersData = computed(() => {
  return orders.value.map(order => {
    return {
      ...order,
      createdTime: convertDate(order.createdTime)
    }
  })
})
</script>

<style lang="css" scoped>
  
</style>