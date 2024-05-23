<template>
  <section>
    <OrderDialog />
    <el-row class="add-worker" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <OrdersTable />
  </section>
</template>

<script setup>

import OrdersTable from "@/components/orders/OrdersTable.vue"
import OrderDialog from "@/components/orders/OrderDialog.vue"
import { dialogStore } from "@/stores/utils/dialog";
import { watch } from "vue";
import { orderStore } from "@/stores/data/order";
import { authStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";

const dialog_store = dialogStore()
const order_store = orderStore()
const auth_store = authStore()
const { user } = storeToRefs(auth_store)

watch(user, () => {
  order_store.getAllOrders(user.value.id)
})

</script>

<style lang="css" scoped>
  @import url("@/styles/components/orders/order.css");
</style>