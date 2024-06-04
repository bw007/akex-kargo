<template>
  <el-table 
    border 
    :empty-text="ordersData.length ? `Ma'lumot topilmadi` : `Ma'lumot yo'q`" 
    :data="filterOrderData" 
    style="width: 100%; height: calc(100vh - 200px);"
  >
    <el-table-column fixed type="index" width="40" align="center" />
    <el-table-column class="expand-column" type="expand">
      <template #default="list">
        <el-row class="expand-column">
          <el-col>
            <el-text class="label">Mahsulot nomi:</el-text>
            <el-text>{{ list.row.name }}</el-text>
          </el-col>
          <el-col>
            <el-text class="label">Qabul vaqti:</el-text>
            <el-text>{{ list.row.createdTime }}</el-text>
          </el-col>
          <el-col>
            <el-text class="label">Telefon raqami:</el-text>
            <el-text>{{ list.row.phone }}</el-text>
          </el-col>
          <el-col>
            <el-text class="label">Zaxira raqam:</el-text>
            <el-text>{{ list.row.phoneReserve }}</el-text>
          </el-col>
          <el-col>
            <el-text class="label">To'lov holati:</el-text>
            <el-text :type="list.row.payment == list.row.price ? 'success' : 'warning'">
              {{ list.row.payment == list.row.price ? "To'langan" : ((list.row.payment/list.row.price * 100)?.toFixed(1) + "% | " + list.row.payment?.toLocaleString()) }}
            </el-text>
          </el-col>
          <el-col>
            <el-button :disabled="list.row.price == list.row.payment" @click="addPayment(list.row.id)" icon="Money" size="small" type="warning" plain>To'lov qo'shish</el-button>
            <el-button class="edit" @click="edit(list.row.id)" size="small" title="Tahrirlash" icon="Edit" type="primary" plain>Tahrirlash</el-button>
            <router-link :to="{ name: 'OrdersItem', params: { id: list.row.id } }">
              <el-button size="small" title="Ko'rish" icon="View" type="success" plain>Ko'rish</el-button>
            </router-link>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column label="Mahsulot nomi" min-width="160" prop="name">
      <template #default="list">
        <el-text>{{ list.row.name }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="ID" prop="id" width="75">
      <template #default="list">
        <el-text type="primary">#{{ list.row.id.slice(7, 12) }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Buyurtmachi" min-width="160" prop="firstName">
      <template #default="list">
        <el-text>{{ list.row.firstName }} {{ list.row.lastName }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Mahsulot havolasi" width="150" prop="name">
      <template #default="list">
        <el-link :href="list.row.link" class="link" target="_blank" type="primary">
          Havola
          <el-icon size="12">
            <top-right />
          </el-icon>
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="Narxi" prop="price" min-width="120">
      <template #default="list">
        <el-popover effect="dark" trigger="hover" placement="left" width="auto">
          <template #default>            
            <p>To'langan: {{ list.row.payment?.toLocaleString() }}</p>          
          </template>
          <template #reference>
            <el-text>{{ list.row.price?.toLocaleString() }}</el-text>          
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Holati" min-width="95" prop="role">
      <template #default="list">
        <el-text type="success" v-if="list.row.status == 0">Yangi</el-text>
        <el-text type="warning" v-if="list.row.status == 1">Jarayonda</el-text>
        <el-text type="danger" v-if="list.row.status == 2">Bekor qilingan</el-text>
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="right" min-width="165">
      <template #header>
        <el-input v-model="search" placeholder="Qidirish..." clearable />
      </template>
      <template #default="list">
        <el-button icon="Money" :disabled="list.row.price == list.row.payment" @click="addPayment(list.row.id)" size="small" title="To'lov" type="warning" plain />
        <el-button class="edit" @click="edit(list.row.id)" size="small" title="Tahrirlash" icon="Edit" type="primary" plain />
        <router-link class="profil-link" :to="{ name: 'OrdersItem', params: { id: list.row.id } }">
          <el-button size="small" title="Ko'rish" icon="View" type="success" plain />
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const emit = defineEmits(["edit", "addPayment"]);
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
      createdTime: convertDate(order.createdTime, 'full')
    }
  })
})

const edit = (id) => {
  emit("edit", id)
  dialog_store.setEditToggle(true)
}
const addPayment = (id) => {
  emit("addPayment", id)
  dialog_store.setPaymentToggle(true)
}

</script>

<style lang="css" scoped>
  @import url("@/styles/components/orders/order-table.css");
</style>