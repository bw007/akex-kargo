<template>
  <el-table empty-text="Ma'lumot yo'q" :data="filterOrderData" style="width: 100%; height: calc(100vh - 200px);">
    <el-table-column fixed type="index" width="40" align="center" />
    <el-table-column label="Buyurtmachi" min-width="140" prop="firstName">
      <template #default="list">
        <el-text tag="b">{{ list.row.firstName }} {{ list.row.lastName }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="ID" prop="id" width="75">
      <template #default="list">
        <el-text type="primary">#{{ list.row.phone.slice(4, 9) }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Mahsulot nomi" min-width="160" prop="name">
      <template #default="list">
        <el-text>{{ list.row.name }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Mahsulot havolasi" min-width="150" prop="name">
      <template #default="list">
        <el-link :href="list.row.link" class="link" target="_blank" type="primary">
          Havola
          <el-icon size="12">
            <top-right />
          </el-icon>
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="Qabul sanasi" min-width="140" prop="createdTime">
      <template #default="list">
        <el-text>{{ list.row.createdTime }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Telefon raqami" min-width="130" prop="status">
      <template #default="list">
        <el-text :title="'Zaxira: '+list.row.phoneReserve">
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
    <el-table-column label="Holati" min-width="115" prop="role">
      <template #default="list">
        <el-text v-if="list.row.status == 0">Yangi</el-text>
        <el-text v-if="list.row.status == 1">Jarayonda</el-text>
        <el-text v-if="list.row.status == 2">Bekor qilingan</el-text>
      </template>
    </el-table-column>
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
const emit = defineEmits(["edit"]);
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { convertDate } from '@/stores/utils/helper';
import { orderStore } from '@/stores/data/order';
import { dialogStore } from '@/stores/utils/dialog';

const order_store = orderStore()
const dialog_store = dialogStore()
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

const edit = (id) => {
  emit("edit", id)
  dialog_store.setEditToggle(true)
}
</script>

<style lang="css" scoped>
  @import url("@/styles/components/orders/order-table.css");
</style>